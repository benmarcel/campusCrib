// app/lib/actions.ts
"use server";
import { z } from "zod";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = formData.get("callbackUrl") as string;
  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return error?.message ?? "Invalid credentials";
  }
  // redirect to callbackUrl if present
  if (callbackUrl && callbackUrl !== "") {
    redirect(callbackUrl);
  }

  // Fetch user profile (role)
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    return "Unable to load user profile";
  }

  // Redirect based on role
  switch (profile.role) {
    case "admin":
      redirect("/admin");
    case "landlord":
      redirect("/dashboard/rental-apartment");
    case "student":
    default:
      redirect("/dashboard");
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const supabase = await createClient();

  // Sign up (metadata goes to trigger)
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name"),
        phone_number: formData.get("phone_number"),
        role: formData.get("role") || "student",
        school: formData.get("school"),
        address: formData.get("address"),
      },
    },
  });

  if (error || !data.user) {
    return error?.message ?? "Signup failed";
  }

  // Fetch role from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    return "Unable to load user profile";
  }

  // Redirect based on role
  switch (profile.role) {
    case "admin":
      redirect("/admin");
    case "landlord":
      redirect("/dashboard/rental-apartment");
    default:
      redirect("/dashboard");
  }
}

// update profile

export async function updateProfile(
  prevState: string | undefined,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "User not found";
  }
  // Update user profile
  const updates = {
    full_name: formData.get("full_name") as string,
    phone_number: formData.get("phone_number") as string,
    school: formData.get("school") as string,
    address: formData.get("address") as string,
  };

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    return error.message;
  }

  return "Profile updated successfully";
}


export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/auth/login");
}

// add new listings


// validation schema
const apartmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price_per_year: z.number().min(0, "Price must be non-negative"),
  address: z.string().min(1, "Address is required"),
  school: z.string(),
  school: z.string().optional(),
});

// state
// lib/types.ts
export type AddApartmentState = {
  success?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: string[];
};



import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function uploadImages(files: FormData) {
  // Use service role to bypass RLS
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Add this to .env.local
  );

  const fileList = files.getAll("files") as File[];
  
  const uploadPromises = fileList.map(async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from("property-images")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  });

  return await Promise.all(uploadPromises);
}

export async function addApartment(
  prevState: AddApartmentState,
  formData: FormData,
  imageUrls: string[]
): Promise<AddApartmentState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current user:", user?.id);

  if (!user) {
    return { error: "Unauthorized user" };
  }

  // Validate form data
  const apartmentData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string | null,
    price_per_year: Number(formData.get("price_per_year")),
    address: formData.get("address") as string,
    school: formData.get("school") as string | null,
    status: 'active',
  };

  const parseResult = apartmentSchema.safeParse(apartmentData);

  if (!parseResult.success) {
    return {
      error: "Form validation failed",
      fieldErrors: z.treeifyError(parseResult.error).errors,
    };
  }

  const dataToInsert = {
    landlord_id: user.id,
    ...parseResult.data,
  };

  console.log("Attempting to insert:", dataToInsert);

  // Insert new listing
  const { data: listing, error } = await supabase
    .from("listings")
    .insert([dataToInsert])
    .select()
    .single();

  if (error) {
    console.error("Listing insert error:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return { error: `${error.message} (${error.code})` };
  }

  console.log("Listing created:", listing);

  // Insert listing images
  const imageRows = imageUrls.map(url => ({
    listing_id: listing.id,
    image_url: url,
  }));

  console.log("Attempting to insert images:", imageRows);

  const { error: imageError } = await supabase
    .from('listing_images')
    .insert(imageRows);

  if (imageError) {
    console.error("Image insert error:", {
      message: imageError.message,
      code: imageError.code,
      details: imageError.details,
      hint: imageError.hint,
    });
    return { error: `${imageError.message} (${imageError.code})` };
  }

   setTimeout(() => {
    
    redirect("/dashboard/rental-apartment");
  }, 1000);
  return { success: true, message: "Listing added successfully" };
}

// update existing listing
export async function updateApartment(
  prevState: AddApartmentState,
  listingId: string,
  formData: FormData
): Promise<AddApartmentState> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized user" };

  const apartmentData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price_per_year: Number(formData.get("price_per_year")),
    address: formData.get("address"),
    school: formData.get("school"),
    status: formData.get("status") === "active" ? "active" : "inactive",
  };

  const parseResult = apartmentSchema.safeParse(apartmentData);
  if (!parseResult.success) {
    return {
      error: "Form validation failed",
      fieldErrors: z.treeifyError(parseResult.error).errors,
    };
  }

  //  Ownership check
  const { data: existingListing } = await supabase
    .from("listings")
    .select("landlord_id")
    .eq("id", listingId)
    .single();

  if (!existingListing || existingListing.landlord_id !== user.id) {
    return { error: "Not authorized to update this listing" };
  }

  const { error } = await supabase
    .from("listings")
    .update(parseResult.data)
    .eq("id", listingId);

  if (error) {
    return { error: error.message };
  }
  setTimeout(() => {
    
    redirect("/dashboard/rental-apartment");
  }, 1000);
  return { success: true, message: "Listing updated successfully" };
}


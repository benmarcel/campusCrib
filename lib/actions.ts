// app/lib/actions.ts
"use server";
import { z } from "zod";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import {
  sendRoommateRequestEmail,
  sendRoommateResponseEmail
} from '@/lib/email'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
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
      redirect("/admin/dashboard");
    case "landlord":
      redirect("/landlords/dashboard");
    case "student":
    default:
      redirect("/apartments");
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
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
        school: formData.get("school") || "",
        address: formData.get("address") || "",
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
      redirect("/admin/dashboard");
    case "landlord":
      redirect("/landlords/dashboard");
    default:
      redirect("/apartments");
  }
}

// update profile

export async function updateProfile(
  prevState: string | undefined,
  formData: FormData,
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
import { console } from "inspector";
// import { vi } from "zod/locales";

export async function uploadImages(files: FormData) {
  // Use service role to bypass RLS
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Add this to .env.local
  );

  const fileList = files.getAll("files") as File[];

  const uploadPromises = fileList.map(async (file) => {
    const fileExt = file.name.split(".").pop();
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
  imageUrls: string[],
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

  // Insert new apartment
  const { data: apartment, error } = await supabase
    .from("apartments")
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

  console.log("Listing created:", apartment);

  // Insert apartment images
  const imageRows = imageUrls.map((url) => ({
    apartment_id: apartment.id,
    image_url: url,
  }));

  console.log("Attempting to insert images:", imageRows);

  const { error: imageError } = await supabase
    .from("apartment_images")
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

  redirect("/landlords/dashboard");
  // return { success: true, message: "Listing added successfully" };
}

// update existing listing
export async function updateApartment(
  prevState: AddApartmentState,
  listingId: string,
  formData: FormData,
): Promise<AddApartmentState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
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
    .from("apartments")
    .select("landlord_id")
    .eq("id", listingId)
    .single();

  if (!existingListing || existingListing.landlord_id !== user.id) {
    return { error: "Not authorized to update this listing" };
  }

  const { error } = await supabase
    .from("apartments")
    .update(parseResult.data)
    .eq("id", listingId);

  if (error) {
    return { error: error.message };
  }

  // This updates the UI without a full browser redirect
  revalidatePath("/landlords/dashboard");
  return { success: true, message: "Listing updated successfully" };
}

// toggle apartment status
export async function toggleApartmentStatus(apartmentId: string) {
  console.log("Action triggered for ID:", apartmentId);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized user" };

  // Ownership check
  const { data: existingApartment } = await supabase
    .from("apartments")
    .select("landlord_id, is_active")
    .eq("id", apartmentId)
    .single();

  if (!existingApartment || existingApartment.landlord_id !== user.id) {
    console.log("Not authorized to update this apartment");
    return { error: "Not authorized to update this apartment" };
  }

  const { error } = await supabase
    .from("apartments")
    .update({ is_active: !existingApartment.is_active })
    .eq("id", apartmentId);

  if (error) {
    return { error: error.message };
  }
  console.log("Apartment status toggled");

  // This updates the UI without a full browser redirect
  revalidatePath("/landlords/dashboard");
}

const bookingSchema = z.object({
  apartment_id: z.string().uuid("Invalid UUID format"),
  student_id: z.string().uuid("Invalid UUID format"),
  visit_date: z.string().min(1, "Visit date is required"), // Fixed casing to lowercase 'v'
  visit_time: z.string().min(1, "Visit time is required"),
  landlord_id: z.string().uuid("Invalid UUID format"),
  contact_info: z.string().min(1, "Contact info is required"), // match your 'required' attribute in HTML
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});

export type BookingState =
  | {
      error?: string;
      fieldErrors?: string[];
    }
  | undefined;

export async function bookApartment(
  prevState: BookingState,
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized user" };

  const apartmentId = formData.get("apartment_id") as string;

  const { data: apartment, error: apartmentError } = await supabase
    .from("apartments")
    .select("landlord_id")
    .eq("id", apartmentId)
    .single();

  if (apartmentError || !apartment) {
    return { error: "Apartment not found" };
  }

  if (apartment.landlord_id === user.id) {
    return { error: "You cannot book your own apartment" };
  }

  const bookingData = {
    apartment_id: apartmentId,
    student_id: user.id,
    landlord_id: apartment.landlord_id,
    visit_date: formData.get("visit_date") as string, // matches schema
    visit_time: formData.get("visit_time") as string, // matches schema
    contact_info: formData.get("contact_info") as string, // matches schema
    status: "pending",
  };

  const parseResult = bookingSchema.safeParse(bookingData);
  if (!parseResult.success) {
    console.error("Booking validation error:", parseResult.error);
    return {
      error: "Form validation failed",
      fieldErrors: z.treeifyError(parseResult.error).errors,
    };
  }

  const { error } = await supabase.from("bookings").insert(bookingData);
  if (error) return { error: error.message };

  redirect("/my-bookings");
}

// cancel booking

import { revalidatePath } from "next/cache";

export async function cancelBooking(booking_id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (profileError || !profile) return;

  if (profile.role !== "student" && profile.role !== "admin") {
    console.error("Unauthorized");
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", booking_id);

  if (error) {
    console.error(error);
    return;
  }

  // This is the line that "refreshes" the data
  revalidatePath("/my-bookings");
  redirect("/my-bookings");
}

// edit booking
export async function editBooking(prevState: BookingState, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized user" };

  const bookingData = {
    visit_date: formData.get("visit_date") as string,
    visit_time: formData.get("visit_time") as string,
    contact_info: formData.get("contact_info") as string,
  };
  const booking_id = formData.get("booking_id") as string;
  const parseResult = bookingSchema.partial().safeParse(bookingData);
  if (!parseResult.success) {
    return {
      error: "Form validation failed",
      fieldErrors: z.treeifyError(parseResult.error).errors,
    };
  }

  const { error } = await supabase
    .from("bookings")
    .update(bookingData)
    .eq("id", booking_id)
    .eq("student_id", user.id); // Ensure student owns the booking

  if (error) {
    return { error: error.message };
  }

  redirect("/my-bookings");
}

// confirm bookings (landlord)

export async function confirmBooking(booking_id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (profileError || !profile) return;

  if (profile.role !== "landlord" && profile.role !== "admin") {
    // console.error("Unauthorized");
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: "confirmed" })
    .eq("id", booking_id);

  if (error) {
    // console.error(error);
    return;
  }

  // This is the line that "refreshes" the data
  revalidatePath("/landlords/dashboard/");
  // redirect("/landlords/dashboard/my-bookings");
}

// admin actions

export async function verifyUsers(user_id: string) {
  const supabase = await createClient();

  // check if user exists
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();

  if (userError || !user) {
    console.error("User not found:", userError);
    return;
  }

  // Verify user logic here
  const { error: verificationError } = await supabase
    .from("profiles")
    .update({ is_verified: true })
    .eq("id", user_id);

  if (verificationError) {
    console.error("Error verifying user:", verificationError);
    return;
  }

  // console.log("User verified successfully:", verifiedUser);
  revalidatePath("/admin/dashboard");
}

// apartment

export async function verifyApartments(apartment_id: string) {
  const supabase = await createClient();

  // check if apartment exists
  const { data: apartment, error: apartmentError } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", apartment_id)
    .single();

  if (apartmentError || !apartment) {
    console.error("Apartment not found:", apartmentError);
    return;
  }

  // Verify apartment logic here
  const { error: verificationError } = await supabase
    .from("apartments")
    .update({ is_verified: true, verification_status: "verified" })
    .eq("id", apartment_id);

  if (verificationError) {
    console.error("Error verifying apartment:", verificationError);
    return;
  }

  // console.log("Apartment verified successfully:", verifiedApartment);
  revalidatePath("/admin/dashboard");
}
export async function rejectApartments(apartment_id: string) {
  const supabase = await createClient();

  // check if apartment exists
  const { data: apartment, error: apartmentError } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", apartment_id)
    .single();

  if (apartmentError || !apartment) {
    console.error("Apartment not found:", apartmentError);
    return;
  }

  // Verify apartment logic here
  const { error: verificationError } = await supabase
    .from("apartments")
    .update({ is_verified: false, verification_status: "rejected" })
    .eq("id", apartment_id);

  if (verificationError) {
    console.error("Error rejecting apartment:", verificationError);
    return;
  }

  // console.log("Apartment rejected successfully:", verifiedApartment);
  revalidatePath("/admin/dashboard");
}

export async function submitReview(formData: FormData) {
  const supabase = await createClient();

  // Extract data from form
  const apartmentId = formData.get("apartmentId") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;

  // Get the logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in to leave a review." };

  // Insert into reviews table
  const { error } = await supabase.from("reviews").insert({
    apartment_id: apartmentId,
    student_id: user.id,
    rating,
    comment,
  });

  if (error) {
    console.error("Error submitting review:", error.message);
    return { error: error.message };
  }

  console.log("Review submitted successfully");

  // 4. Refresh the apartment page to show the new review
  revalidatePath(`/apartments/${apartmentId}`);
  return { success: true };
}

export async function saveApartment(apartmentId: string) {
  const supabase = await createClient();

  // Get the logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in to save an apartment." };

  // check that the user is a student
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error("Unable to load user profile:", profileError?.message);
    return { error: "Unable to load user profile." };
  }

  if (profile.role !== "student") {
    return { error: "Only students can save apartments." };
  }

  // Check if already saved
  const { data: existing, error: existingError } = await supabase
    .from("saved_apartments")
    .select("*")
    .eq("apartment_id", apartmentId)
    .eq("student_id", user.id)
    .single();

  if (existingError && existingError.code !== "PGRST116") {
    console.error("Error checking saved apartments:", existingError.message);
    return { error: existingError.message };
  }

  if (existing) {
    return { message: "Apartment already saved." };
  }

  // Insert into saved_apartments table
  const { error } = await supabase.from("saved_apartments").insert({
    apartment_id: apartmentId,
    student_id: user.id,
  });

  if (error) {
    console.error("Error saving apartment:", error.message);
    return { error: error.message };
  }

  console.log("Apartment saved successfully");

  // redirect to saved apartments page
  revalidatePath(`/saved-apartments`);
  redirect(`/saved-apartments`);
}

// initiateverification payment

export async function initiateVerificationPayment(apartmentId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized user" };
  // verify that user is a landlord
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (profileError || !profile) {
    console.error("Unable to load user profile:", profileError?.message);
    return { error: "Unable to load user profile." };
  }

  if (profile.role !== "landlord") {
    return { error: "Only landlords can initiate verification payments." };
  }

  // Store a pending payment record before redirecting

  const amountInNaira = 1000; // ₦1,000
  const { data } = await supabase
    .from("verification_payments")
    .insert({
      apartment_id: apartmentId,
      landlord_id: user.id,
      amount: amountInNaira * 100, // ₦ to kobo (Paystack uses kobo)
      status: "pending",
    })
    .select()
    .single();

  return { paymentId: data.id, email: user.email };
}

// verify payment on clientside

export async function verifyPayment(reference: string) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    },
  );

  const data = await res.json();
  console.log("Paystack verify response:", data.data.status);
  console.log("Metadata:", data.data.metadata);

  if (data.data.status === "success") {
    const { apartment_id, payment_id } = data.data.metadata;
    const supabase = await createClient();

    const { error: e1 } = await supabase
      .from("verification_payments")
      .update({ status: "paid", paystack_reference: reference })
      .eq("id", payment_id);

    const { error: e2 } = await supabase
      .from("apartments")
      .update({ verification_status: "pending_review" })
      .eq("id", apartment_id);

    console.log("DB errors:", e1, e2);
    revalidatePath("/landlords/dashboard");
  }
}

export async function initiateRoommatePayment(receiverId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");


  // Block if sender has no roommate profile
  const { data: myProfile } = await supabase
    .from('roommate_profiles')
    .select('id')
    .eq('student_id', user.id)
    .single()

  if (!myProfile) {
    throw new Error('You need to create a roommate profile before connecting with others.')
  }

  // Block if a request already exists between these two
  const { data: existing } = await supabase
    .from("roommate_requests")
    .select("id, status")
    .eq("sender_id", user.id)
    .eq("receiver_id", receiverId)
    .single();

  if (existing) {
    throw new Error(
      existing.status === "declined"
        ? "This person has declined your request. You cannot send another."
        : "You have already sent a request to this person.",
    );
  }

  // Get receiver email for Paystack
  const { data: receiver } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", receiverId)
    .single();

  // Create pending payment record
  const { data: payment } = await supabase
    .from("roommate_payments")
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      amount: 20000, // ₦200 in kobo
      status: "pending",
    })
    .select()
    .single();

  return {
    paymentId: payment.id,
    email: user.email,
    receiverName: receiver?.full_name,
    senderId: user.id,
  };
}

// Called by webhook after Paystack confirms payment
export async function confirmRoommatePayment(
  reference: string,
  paymentId: string,
  senderId: string,
  receiverId: string,
  message?: string,
) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    },
  );

  const data = await res.json();
  console.log("Paystack verify response:", data.data.status);
  console.log("Metadata:", data.data.metadata);

  if (data.data.status === "success") {
    const supabase = await createClient();

    // Update payment record
    await supabase
      .from("roommate_payments")
      .update({ status: "paid", paystack_reference: reference })
      .eq("id", paymentId);

    // Now create the actual request
    await supabase.from("roommate_requests").insert({
      sender_id: senderId,
      receiver_id: receiverId,
      message: message ?? null,
      status: "pending",
      paystack_reference: reference,
    });
    // Fetch names + emails for the notification
  const { data: users } = await supabase
    .from('profiles')
    .select('id, full_name, school')
    .in('id', [senderId, receiverId])

  const sender = users?.find(u => u.id === senderId)
  const receiver = users?.find(u => u.id === receiverId)

  // Get receiver's auth email from Supabase auth
  const { data: receiverAuth } = await supabase
    .rpc('get_user_email', { user_id: receiverId })

  // Get sender's roommate profile for bio/dept
  const { data: senderProfile } = await supabase
    .from('roommate_profiles')
    .select('bio, department')
    .eq('student_id', senderId)
    .single()

  if (receiver && receiverAuth) {
    await sendRoommateRequestEmail({
      receiverEmail: receiverAuth,
      receiverName: receiver.full_name,
      senderName: sender?.full_name ?? 'A student',
      senderSchool: sender?.school ?? '',
      senderDepartment: senderProfile?.department,
      senderBio: senderProfile?.bio,
    }).catch(err => console.error('Email send failed:', err))
  }
  }

}

// Receiver accepts
export async function acceptRoommateRequest(requestId: string) {
  const supabase = await createClient();

  await supabase
    .from("roommate_requests")
    .update({ status: "accepted" })
    .eq("id", requestId);

    // Fetch request details for email
  const { data: request } = await supabase
    .from('roommate_requests')
    .select(`
      sender_id,
      receiver_id,
      sender:profiles!roommate_requests_sender_id_fkey(full_name),
      receiver:profiles!roommate_requests_receiver_id_fkey(full_name, phone_number)
    `)
    .eq('id', requestId)
    .single()

  if (request) {
    const { data: senderAuth } = await supabase
      .rpc('get_user_email', { user_id: request.sender_id })

    if (senderAuth) {
      await sendRoommateResponseEmail({
        senderEmail: senderAuth,
        senderName: request.sender[0]?.full_name ?? '',
        receiverName: request.receiver[0]?.full_name ?? '',
        receiverPhone: request.receiver[0]?.phone_number,
        receiverId: request.receiver_id,
        status: 'accepted',
      }).catch(err => console.error('Email send failed:', err))
    }
  }

  revalidatePath("/roommate/requests");
}

// Receiver declines
export async function declineRoommateRequest(requestId: string) {
  const supabase = await createClient();

  await supabase
    .from("roommate_requests")
    .update({ status: "declined" })
    .eq("id", requestId);

    
  revalidatePath("/roommate/requests");
}

// Create or update roommate profile
export async function upsertRoommateProfile(formData: {
  school: string;
  department?: string;
  bio?: string;
  habits: string[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  await supabase.from("roommate_profiles").upsert(
    {
      student_id: user.id,
      ...formData,
      is_active: true,
    },
    { onConflict: "student_id" },
  );

  revalidatePath("/roommate");
  revalidatePath("/roommate/create");
}

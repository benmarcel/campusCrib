import type {
  Profile,
  Apartment,
  ApartmentWithImages,
  ApartmentWithReviewCount,
  ApartmentFilters,
  Booking,
  BookingsDisplayType,
} from "./definitions";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// get user profile
export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    console.error(error);
    redirect("/auth/login");
  }

  const email = user.email || "";
  return {
    full_name: profile.full_name,
    email: email,
    phone_number: profile.phone_number,
    avatar_url: profile.avatar_url,
    is_verified: profile.is_verified,
    school: profile.school,
    address: profile.address,
  };
}

// get partial profile for navbar
import { cache } from "react";

export const getUserProfile = cache(async (userId: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("role, avatar_url, full_name")
    .eq("id", userId)
    .single();

  return data;
});
//

// get all listings
export async function getAllApartments(
  filters?: ApartmentFilters,
): Promise<ApartmentWithReviewCount[]> {
  const supabase = await createClient();

  let query = supabase
    .from("apartments")
    .select(
      `
      *,
      apartment_images (
        image_url
      ),
      reviews:reviews(count)
    `,
    )
    .eq("is_active", true)
    .limit(1, { foreignTable: "apartment_images" });

  // SEARCH (location)
  if (filters?.location) {
    query = query.or(`address.ilike.%${filters.location}%`);
  }

  //  PRICE RANGE FILTER
  if (filters?.priceRange) {
    if (filters.priceRange.includes("+")) {
      // Handle "300000+"
      const min = parseInt(filters.priceRange.replace("+", ""), 10);
      query = query.gte("price_per_year", min);
    } else if (filters.priceRange.includes("-")) {
      // Handle "100000 - 150000"
      const [minStr, maxStr] = filters.priceRange.split("-");
      const min = parseInt(minStr.trim(), 10);
      const max = parseInt(maxStr.trim(), 10);

      query = query.gte("price_per_year", min).lte("price_per_year", max);
    }
  }

  // LOCATION FILTER
  if (filters?.school) {
    query = query.eq("school", filters.school);
  }

  // HOUSE TYPE FILTER
  if (filters?.houseType) {
    query = query.ilike("title", `%${filters.houseType}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching apartments:", error);
    return [];
  }

  console.log("Fetched apartments:", data);

  if (!data) {
    return [];
  }
  // Normalize review count
  return data.map((listing) => ({
    ...listing,
    reviews_count: listing.reviews?.[0]?.count ?? 0,
  }));
}

export async function getApartmentById(listing_id: string): Promise<Apartment> {
  const supabase = await createClient();

  const { data: apartment, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", listing_id)
    .maybeSingle(); // Use maybeSingle to avoid crashing if empty

  if (error) {
    console.error("Supabase Error:", error.message);
    throw new Error("Database connection failed");
  }

  if (!apartment) {
    console.error("No listing found with ID:", listing_id);
    throw new Error("Listing not found");
  }

  return apartment;
}

// for listing details page
export async function getApartmentDetailsById(apartment_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apartments")
    .select(
      `
    title, 
    description,
    price_per_year,
    address,
    created_at,
    apartment_images (
      image_url
    ),
    reviews (
      rating,
      comment,
      student:profiles (
        full_name,
        avatar_url
      )
    )
  `,
    )
    .eq("id", apartment_id)
    .single();

  if (error) {
    console.error(error);
    return { error: error.message || "Listing not found" };
  }
  return data;
}

// get user

export async function getLoggedinIser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
// get apartment by landlord id
export async function getApartmentsByLandlordId(): Promise<
  ApartmentWithImages[]
> {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: listings, error } = await supabase
    .from("apartments")
    .select("*, apartment_images(image_url)")
    .eq("landlord_id", user?.id);

  if (error) {
    console.error(error);
    return [];
  }
  return listings;
}

// get listing near by school and addrees
export async function getListingsBySchoolAndAddress(
  school: string,
  address: string,
): Promise<Apartment[]> {
  const supabase = await createClient();
  let query = supabase.from("listings").select("*");

  if (school) {
    query = query.ilike("school", `%${school}%`);
  }

  if (address) {
    query = query.ilike("address", `%${address}%`);
  }

  const { data: listings, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return listings || [];
}

// get all bookings
// for admin dashboard

export async function getAllBookings(): Promise<Booking[]> {
  const supabase = await createClient();
  const { data: bookings, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return bookings || [];
}

// get bookings by student id
export async function getBookingsByStudentId(): Promise<Booking[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("student_id", user?.id);

  if (error) {
    console.error(error);
    return [];
  }

  return bookings || [];
}

// get bookings by landlord id
export async function getBookingsByLandlordId(): Promise<Booking[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("landlord_id", user?.id);

  if (error) {
    console.error(error);
    return [];
  }

  return bookings || [];
}

// get booking by id
export async function getBookingById(
  booking_id: string,
): Promise<Booking | null> {
  const supabase = await createClient();
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return booking;
}

// cancel booking

export async function cancelBooking(booking_id: string): Promise<boolean> {
  const supabase = await createClient();

  //  check user only student or admin can cancel booking
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (profileError) {
    console.error(profileError);
    return false;
  }

  if (profile.role !== "student" || profile.role !== "admin") {
    console.error("Only students and admins can cancel bookings");
    return false;
  }
  //  check if booking exists
  const { error: fetchError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    return false;
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", booking_id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

//  display bookings

export async function displayAllStudentbookings(): Promise<BookingsDisplayType[]> {
  const supabase = await createClient();

  //  check user only student or landlord can cancel booking
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (profileError) {
    console.error(profileError);
    return [];
  }

    if (profile.role !== "student" && profile.role !== "landlord") {
      console.error("Only students and landlords can view bookings");
      console.log(profile.role);
      
      return [];
    }

  if (profile.role === "student") {
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(
        `*, apartments (
      title,
      address,
      price_per_year,
      school, apartment_images (image_url)
    )`,
      )
      .eq("student_id", user?.id);

    if (bookingsError) {
      console.error(bookingsError);
      return [];
    }

    return bookings as BookingsDisplayType[];
  }

  // else it is landlord
   const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(
        `*, apartments (
      title,
      address,
      price_per_year,
      school, apartment_images (image_url)
    )`,
      )
      .eq("landlord_id", user?.id);

    if (bookingsError) {
      console.error(bookingsError);
      return [];
    }

    return bookings as BookingsDisplayType[];
}

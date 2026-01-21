

import type { Profile, Apartment, ApartmentWithImages} from "./definitions";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
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

// get all listings
export async function getAllApartments(): Promise<Apartment[]> {
  const supabase = await createClient();

 const { data: listings, error } = await supabase
  .from('listings')
  .select(`
    *,
    listing_images (
      url
    )
  `)
  // Optional: Limit to only 1 image per listing for performance
  .limit(1, { foreignTable: 'listing_images' });

  if (error) {
    console.error(error);
    return [];
  }

  return listings;
} 

export async function getApartmentById(listing_id: string): Promise<Apartment> {
    const supabase = await createClient();

    const { data: listing, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', listing_id)
      .maybeSingle(); // Use maybeSingle to avoid crashing if empty

      if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error('Database connection failed');
      }

      if (!listing) {
        console.error("No listing found with ID:", listing_id);
        throw new Error('Listing not found');
      }

      return listing;
}

// for listing details page
export async function getApartmentDetailsById (listing_id: string) {
   const supabase = await createClient();
const { data, error } = await supabase
  .from('listings')
  .select(`
    title, 
    description,
    price_per_year,
    address,
    created_at,
    listing_images (
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
  `)
  .eq('id', listing_id )
  .single();

  if (error) {
    console.error(error);
    return {error: error.message || 'Listing not found'};
  }
  return data;
}

// get user

export async function getLoggedinIser()
 {
   const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
    return user;
}
// get listing by landlord id
export async function getApartmentsByLandlordId (): Promise<ApartmentWithImages[]> {

  await cookies();
   const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
   const { data: listings, error } = await supabase
     .from('listings')
     .select('*, listing_images(image_url)')
     .eq('landlord_id', user?.id);

   if (error) {
     console.error(error);
     return [];
   }
   return listings
  }


// get listing near by school and addrees
export async function getListingsBySchoolAndAddress (school: string, address: string): Promise<Apartment[]> {
   const supabase = await createClient();
   let query = supabase.from('listings').select('*');

   if (school) {
     query = query.ilike('school', `%${school}%`);
   }

   if (address) {
     query = query.ilike('address', `%${address}%`);
   }

   const { data: listings, error } = await query;

   if (error) {
     console.error(error);
     return [];
   }

   return listings || [];
}
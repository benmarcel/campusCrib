import type { Profile, Listing } from "./definitions";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

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
export async function getAllListings(): Promise<Listing[]> {
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

// for listing details page
export async function getListingDetailsById (listing_id: string) {
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
// get listing by landlord id
export async function getListingsByLandlordId (landlord_id: string) {
   const supabase = await createClient();
   const { data: listings, error } = await supabase
     .from('listings')
     .select('*, listing_images(image_url)')
     .eq('landlord_id', landlord_id);

   if (error) {
     console.error(error);
     return [];
   }
// get listing near by school and addrees
export async function getListingsBySchoolAndAddress (school: string, address: string): Promise<Listing[]> {
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
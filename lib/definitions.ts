
//    BASE TYPES


export type UUID = string;
export type Timestamp = string;


//    PROFILES

export type UserRole = "student" | "landlord" | "admin";

export type Profile = {
 
  full_name: string | null;
  email: string;
  phone_number: number | null;
  avatar_url: string | null;
  is_verified: boolean;
  school: string | null;
  address: string | null;
};

export type CreateProfile = {
  id: UUID;
  full_name?: string | null;
  phone_number?: number | null;
  avatar_url?: string | null;
  role?: UserRole;
  school?: string | null;
  address?: string | null;
  is_verified?: boolean;
};

export type UpdateProfile = Partial<Omit<Profile, "id">>;


//    LISTINGS


export type Listing = {
  id: UUID;
  landlord_id: UUID;
  title: string;
  description: string | null;
  price_per_month: number;
  address: string;
  is_verified: boolean;
  school: string | null;
  created_at: Timestamp;
};

export type CreateListing = {
  landlord_id: UUID;
  title: string;
  description?: string | null;
  price_per_year: number;
  address: string;
  school?: string | null;
};

export type UpdateListing = Partial<Omit<Listing, "id" | "landlord_id" | "created_at">>;


//    LISTING IMAGES

export type ListingImage = {
  id: UUID;
  listing_id: UUID;
  image_url: string;
  created_at: Timestamp;
};

export type CreateListingImage = {
  listing_id: UUID;
  image_url: string;
};

//   BOOKINGS

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: UUID;
  listing_id: UUID;
  student_id: UUID;
  visit_date: Timestamp;
  status: BookingStatus;
  created_at: Timestamp;
};

export type CreateBooking = {
  listing_id: UUID;
  student_id: UUID;
  visit_date: Timestamp;
};

export type UpdateBooking = {
  status: BookingStatus;
};

//    REVIEWS

export type Review = {
  id: UUID;
  listing_id: UUID;
  student_id: UUID;
  rating: number; // 1–5
  comment: string | null;
  created_at: Timestamp;
};

export type CreateReview = {
  listing_id: UUID;
  student_id: UUID;
  rating: number;
  comment?: string | null;
};

/* =========================
   JOINED / COMPOSITE TYPES
========================= */

// export type ListingWithLandlord = Listing & {
//   landlord: Pick<Profile, "id" | "full_name" | "phone_number" | "avatar_url">;
// };

export type ListingWithImages = Listing & {
  images: ListingImage[];
};

export type ListingWithReviews = Listing & {
  reviews: Review[];
};

export type FullListing = Listing &
  ListingWithImages &
  ListingWithReviews & {
    landlord: Profile;
  };

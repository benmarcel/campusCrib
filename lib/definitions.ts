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

export type Apartment = {
  id: UUID;
  landlord_id: UUID;
  title: string;
  description: string;
  price_per_year: number;
  address: string;
  is_verified: boolean;
  is_active: boolean;
  school: string;
  created_at: Timestamp;
};
export interface ApartmentDetail extends Apartment {
  created_at: string;
  apartment_images: { image_url: string }[];
  reviews: {
    rating: number;
    comment: string;
    student: {
      full_name: string;
      avatar_url: string;
    };
  }[];
}

// list type with reviews
export type ApartmentWithReviewCount = ApartmentWithImages & {
  reviews_count: number;
};
export type ApartmentFilters = {
  school?: string;
  priceRange?: string;
  location?: string;
  houseType?: string;
};

export interface Reviews {
  rating: number;
  comment: string;
  student: {
    full_name: string;
    avatar_url?: string;
  }[];
}
export type ApartmentWithImages = {
  id: string;
  landlord_id: string;
  title: string;
  description: string | null;
  price_per_year: number;
  address: string;
  school: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;

  apartment_images: {
    image_url: string;
  }[];
};

//   BOOKINGS

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: UUID;
  apartment_id: UUID;
  student_id: UUID;
  landlord_id: UUID;
  visit_date: Timestamp;
  visit_time: string;
  contact_info: string;
  status: BookingStatus;
  created_at: Timestamp;
};

export type BookingsDisplayType = Booking & {
  // Add 'null' safety
  // Wrap in brackets or ensure 'Booking' is defined
  apartments: {
    id: UUID;
    title: string;
    address: string;
    price_per_year: number;
    school: string;
    apartment_images: {
      image_url: string;
    }[];
  } | null; 
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

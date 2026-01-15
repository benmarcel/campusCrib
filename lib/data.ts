import type { Profile } from "./definitions";
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

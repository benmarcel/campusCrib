// app/lib/actions.ts
'use server';

import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const callbackUrl = formData.get('callbackUrl') as string;
  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return error?.message ?? "Invalid credentials";
  }
  // redirect to callbackUrl if present
  if (callbackUrl && callbackUrl !== '') {
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
      redirect("/landlord/dashboard");
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
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name'),
        phone_number: formData.get('phone_number'),
        role: formData.get('role') || 'student',
        school: formData.get('school'),
        address: formData.get('address'),
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
      redirect("/landlord/dashboard");
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
    full_name: formData.get('full_name') as string,
    phone_number: formData.get('phone_number') as string,
    school: formData.get('school') as string,
    address: formData.get('address') as string,
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

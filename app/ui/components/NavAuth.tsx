import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import UserMenu from "./UserMenu"
import type { UserRole } from "@/lib/definitions"
import { getUserProfile } from "@/lib/data"

export interface Profile {
  role: UserRole
  avatar_url: string | null
  full_name: string | null
}

export default async function AuthSection() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userProfile: Profile | null = null

  if (user) {
    userProfile = await getUserProfile(user.id)
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Link 
          href="/auth/login" 
          className="
            px-5 py-2 rounded-lg font-medium text-sm
            text-[#003366] border border-[#003366]
            hover:bg-[#003366] hover:text-white
            transition-all duration-200
            active:scale-95
          "
        >
          Login
        </Link>
        <Link 
          href="/auth/register" 
          className="
            px-5 py-2 rounded-lg font-medium text-sm
            text-white bg-[#003366]
            hover:bg-[#002347] hover:shadow-lg
            transition-all duration-200
            active:scale-95
          "
        >
          Register
        </Link>
      </div>
    );
  }

  return <UserMenu userProfile={userProfile} />;
}
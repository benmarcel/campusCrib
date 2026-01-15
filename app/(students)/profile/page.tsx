import { getProfile } from "@/lib/data";
import { Profile } from "@/app/ui/profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Profile profile={profile} />
    </div>
  );
}

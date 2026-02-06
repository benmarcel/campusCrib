import { getProfile } from "@/lib/data";
import { Profile } from "@/app/ui/components/Profile";
import { Suspense } from "react";
export default async function ProfilePage() {
  

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileDataFetcher />
      </Suspense>
    </div>
  );

}

async function ProfileDataFetcher() {
  const profile = await getProfile();
  return <Profile profile={profile} />;
}
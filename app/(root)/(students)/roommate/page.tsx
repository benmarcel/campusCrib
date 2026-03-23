  export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import Link from "next/link";
import {
  getAllRoommateProfiles,
  getMyRoommateProfile,
  getSentRequests,
} from "@/lib/data";
import RoommateCard from "@/app/ui/roommate/RoommateCard";
import { Users, Plus, UserCircle2 } from "lucide-react";
import { getLoggedinUser } from "@/lib/data";

export default async function RoommatePage() {
  const user = await getLoggedinUser();
  if (!user) return;

  const [profiles, myProfile, sentRequests] = await Promise.all([
    getAllRoommateProfiles(user.id),
    getMyRoommateProfile(user.id),
    getSentRequests(user.id),
  ]);

  // Build a quick lookup: receiverId → request status
  const requestMap = Object.fromEntries(
    sentRequests.map((r) => [r.receiver_id, r.status]),
  );

  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center">
          <span className="text-sm text-slate-500">Loading...</span>
        </div>
      }
    >
      <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                <Users size={16} />
                <span>Find Roomie</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Roommate Board
              </h1>
              <p className="text-slate-500 mt-1">
                {profiles.length} student{profiles.length !== 1 ? "s" : ""}{" "}
                looking for a roommate
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {myProfile ? (
                <Link
                  href="/roommate/create"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 transition-all"
                >
                  <UserCircle2 size={16} />
                  Edit my profile
                </Link>
              ) : (
                <Link
                  href="/roommate/create"
                  className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white hover:bg-accent/90 active:scale-95 transition-all"
                >
                  <Plus size={16} />
                  Create my profile
                </Link>
              )}
              <Link
                href="/roommate/requests"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 transition-all"
              >
                Requests
              </Link>
            </div>
          </div>

          {/* My profile banner — shows if student has a profile */}
          {myProfile && (
            <div className="mb-8 rounded-2xl bg-accent/5 border border-accent/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-accent/10 rounded-xl flex items-center justify-center">
                  <UserCircle2 size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Your profile is live
                  </p>
                  <p className="text-xs text-slate-500">
                    Other students can see and connect with you
                  </p>
                </div>
              </div>
              <Link
                href="/roommate/create"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Edit
              </Link>
            </div>
          )}

          {/* Grid */}
          {profiles.length === 0 ? (
            <EmptyState hasProfile={!!myProfile} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile) => (
                <RoommateCard
                  key={profile.id}
                  profile={profile}
                  requestStatus={requestMap[profile.student_id] ?? null}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Suspense>
  );
}

function EmptyState({ hasProfile }: { hasProfile: boolean }) {
  return (
    <div className="py-24 flex flex-col items-center gap-4 text-center">
      <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center">
        <Users size={28} className="text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-700">No profiles yet</h3>
      <p className="text-slate-400 text-sm max-w-xs">
        {hasProfile
          ? "No other students have created a roommate profile yet. Check back soon."
          : "Be the first to create a profile and start connecting with potential roommates."}
      </p>
      {!hasProfile && (
        <Link
          href="/roommate/create"
          className="mt-2 flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/90 transition-all"
        >
          <Plus size={16} />
          Create my profile
        </Link>
      )}
    </div>
  );
}

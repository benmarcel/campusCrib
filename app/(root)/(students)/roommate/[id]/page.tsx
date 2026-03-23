  export const dynamic = 'force-dynamic';
import { redirect, notFound } from "next/navigation";
// import { connection } from 'next/server'
import {
  getRoommateProfileById,
  getRequestBetween,
  getMyRoommateProfile,
} from "@/lib/data";
import ConnectButton from "@/app/ui/roommate/ConnectButton";
import { getLoggedinUser } from "@/lib/data";
import {
  MapPin,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Clock,
  XCircle,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function RoommateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //   await connection()

  const { id } = await params;
  const user = await getLoggedinUser();
  if (!user) return;

  const profile = await getRoommateProfileById(id);
  console.log("profile", profile);
  if (!profile) notFound();

  // ← use profile.student_id, not id
  // const existingRequest = await getRequestBetween(user.id, profile.student_id);
  // console.log("existingRequest", existingRequest);

  // Redirect if viewing your own profile
  if (profile.student_id === user.id) redirect("/roommate/create");
  const [existingRequest, myProfile] = await Promise.all([
    getRequestBetween(user.id, profile.student_id),
    getMyRoommateProfile(user.id),
  ]);

  const isAccepted = existingRequest?.status === "accepted";
  const initials = profile.profiles?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Back */}
        <Link
          href="/roommate"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to board
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Top banner */}
          <div className="bg-accent/5 border-b border-accent/10 px-8 py-8">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              {profile.profiles?.avatar_url ? (
                <Image
                  src={profile.profiles.avatar_url}
                  alt={profile.profiles.full_name}
                  className="h-20 w-20 rounded-2xl object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-accent">
                    {initials}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black text-slate-900 mb-2">
                  {profile.profiles?.full_name}
                </h1>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={14} className="text-accent flex-shrink-0" />
                    <span>{profile.school}</span>
                  </div>
                  {profile.department && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <BookOpen
                        size={14}
                        className="text-accent flex-shrink-0"
                      />
                      <span>{profile.department}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Phone — only shown if accepted */}
          {isAccepted && (
            <div className="px-8 py-4 bg-green-50 border-b border-green-100 flex items-center gap-3">
              <div className="h-8 w-8 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone size={14} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Contact info
                </p>
                <p className="text-sm font-bold text-green-800">
                  {profile.profiles?.phone_number}
                </p>
              </div>
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <div className="px-8 py-6 border-b border-slate-50">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                About
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Habits */}
          {profile.habits && profile.habits.length > 0 && (
            <div className="px-8 py-6 border-b border-slate-50">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Lifestyle
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.habits.map((habit: string) => (
                  <span
                    key={habit}
                    className="rounded-full bg-accent/5 border border-accent/20 px-4 py-1.5 text-sm font-medium text-accent"
                  >
                    {habit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Request status or connect button */}
          {/* Connect section */}
          <div className="px-8 py-6">
            {!myProfile ? (
              // No roommate profile — block connection
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4">
                  <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      Create your profile first
                    </p>
                    <p className="text-xs text-slate-500">
                      You need a roommate profile before connecting with others.
                    </p>
                  </div>
                </div>
                <Link
                  href="/roommate/create"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-accent text-accent py-3 text-sm font-bold hover:bg-accent/5 transition-all"
                >
                  <Plus size={15} />
                  Create my profile
                </Link>
              </div>
            ) : existingRequest ? (
              <RequestStatusBanner status={existingRequest.status} />
            ) : (
              <div className="flex flex-col gap-3">
                <ConnectButton
                  receiverId={profile.student_id}
                  receiverName={profile.profiles?.full_name}
                />
                <p className="text-xs text-slate-400 text-center">
                  A non-refundable fee of ₦200 is charged to send a connect
                  request. If accepted, their phone number will be revealed to
                  you.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Joined date */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Profile created{" "}
          {new Date(profile.created_at).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </section>
  );
}

function RequestStatusBanner({ status }: { status: string }) {
  if (status === "pending")
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-100 px-5 py-4">
        <div className="h-9 w-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Clock size={16} className="text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-amber-800">Request sent</p>
          <p className="text-xs text-amber-600">
            Waiting for them to accept your connect request.
          </p>
        </div>
      </div>
    );

  if (status === "accepted")
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-100 px-5 py-4">
        <div className="h-9 w-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-green-800">Connected!</p>
          <p className="text-xs text-green-600">
            You&apos;re connected. Their contact info is shown above.
          </p>
        </div>
      </div>
    );

  if (status === "declined")
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-red-50 border border-red-100 px-5 py-4">
        <div className="h-9 w-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <XCircle size={16} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-red-700">Request declined</p>
          <p className="text-xs text-red-500">
            This person has declined your request.
          </p>
        </div>
      </div>
    );

  return null;
}

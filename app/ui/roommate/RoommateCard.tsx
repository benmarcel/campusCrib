import Link from 'next/link'
import { MapPin, BookOpen, ArrowRight, Clock, CheckCircle2, XCircle } from 'lucide-react'
import Image from 'next/image'
type Props = {
  profile: {
    id: string
    student_id: string
    school: string
    department?: string
    bio?: string
    habits?: string[]
    created_at: string
    profiles: {
      full_name: string
      avatar_url?: string
    }
  }
  requestStatus: 'pending' | 'accepted' | 'declined' | null
}

export default function RoommateCard({ profile, requestStatus }: Props) {
  const initials = profile.profiles?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-NG', {
    month: 'short',
    year: 'numeric'
  })

  return (
    <Link
      href={`/roommate/${profile.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all overflow-hidden"
    >
      {/* Card top */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Avatar */}
          <div className="relative">
            {profile.profiles?.avatar_url ? (
              <Image
                src={profile.profiles.avatar_url}
                alt={profile.profiles.full_name}
                className="h-14 w-14 rounded-2xl object-cover"
                width={56}
                height={56}
              />
            ) : (
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <span className="text-lg font-black text-accent">{initials}</span>
              </div>
            )}
          </div>

          {/* Request status badge */}
          {requestStatus && (
            <RequestBadge status={requestStatus} />
          )}
        </div>

        {/* Name */}
        <h3 className="font-black text-slate-900 text-lg leading-tight mb-1">
          {profile.profiles?.full_name}
        </h3>

        {/* School & Department */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={12} />
            <span>{profile.school}</span>
          </div>
          {profile.department && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <BookOpen size={12} />
              <span>{profile.department}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {profile.bio}
          </p>
        )}

        {/* Habits */}
        {profile.habits && profile.habits.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {profile.habits.slice(0, 3).map(habit => (
              <span
                key={habit}
                className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {habit}
              </span>
            ))}
            {profile.habits.length > 3 && (
              <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
                +{profile.habits.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={12} />
          <span>Joined {joinedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
          View profile
          <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  )
}

function RequestBadge({ status }: { status: string }) {
  if (status === 'pending') return (
    <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-600">
      <Clock size={10} />
      Pending
    </span>
  )
  if (status === 'accepted') return (
    <span className="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2.5 py-1 text-xs font-semibold text-green-600">
      <CheckCircle2 size={10} />
      Connected
    </span>
  )
  if (status === 'declined') return (
    <span className="flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-500">
      <XCircle size={10} />
      Declined
    </span>
  )
  return null
}
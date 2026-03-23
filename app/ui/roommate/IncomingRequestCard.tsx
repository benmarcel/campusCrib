'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  acceptRoommateRequest,
  declineRoommateRequest
} from '@/lib/actions'
import {
  CheckCircle2, XCircle, Clock,
  Phone, MapPin, BookOpen
} from 'lucide-react'

type Props = {
  request: {
    id: string
    status: string
    message?: string
    created_at: string
    sender: {
      id: string
      full_name: string
      avatar_url?: string
      phone_number: string
    }
    roommate_profiles: {
      school: string
      department?: string
      habits?: string[]
      bio?: string
    }
  }
}

export default function IncomingRequestCard({ request }: Props) {
  const [isPending, startTransition] = useTransition()

  const initials = request.sender?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const timeAgo = new Date(request.created_at).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Status strip */}
      <div className={`h-1 w-full ${
        request.status === 'pending' ? 'bg-amber-400' :
        request.status === 'accepted' ? 'bg-green-400' :
        'bg-red-400'
      }`} />

      <div className="p-6">
        {/* Sender info */}
        <div className="flex items-start gap-4 mb-4">
          {request.sender?.avatar_url ? (
            <Image
              src={request.sender.avatar_url}
              alt={request.sender.full_name}
              className="h-12 w-12 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="font-black text-accent">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-black text-slate-900">
                {request.sender?.full_name}
              </h3>
              <StatusBadge status={request.status} />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={11} />
                <span>{request.roommate_profiles?.school}</span>
              </div>
              {request.roommate_profiles?.department && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <BookOpen size={11} />
                  <span>{request.roommate_profiles.department}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Habits */}
        {request.roommate_profiles?.habits &&
          request.roommate_profiles.habits.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {request.roommate_profiles.habits.slice(0, 4).map(habit => (
              <span
                key={habit}
                className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {habit}
              </span>
            ))}
          </div>
        )}

        {/* Message */}
        {request.message && (
          <div className="mb-4 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-400 font-semibold mb-1">Message</p>
            <p className="text-sm text-slate-600">{request.message}</p>
          </div>
        )}

        {/* Phone — only if accepted */}
        {request.status === 'accepted' && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3 flex items-center gap-3">
            <Phone size={14} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-green-700">Contact</p>
              <p className="text-sm font-bold text-green-800">
                {request.sender?.phone_number}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        {request.status === 'pending' && (
          <div className="flex items-center gap-3">
            <button
              disabled={isPending}
              onClick={() =>
                startTransition(() => acceptRoommateRequest(request.id))
              }
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-bold text-white hover:bg-accent/90 active:scale-95 disabled:opacity-50 transition-all"
            >
              <CheckCircle2 size={15} />
              Accept
            </button>
            <button
              disabled={isPending}
              onClick={() =>
                startTransition(() => declineRoommateRequest(request.id))
              }
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 disabled:opacity-50 transition-all"
            >
              <XCircle size={15} />
              Decline
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-slate-400">Received {timeAgo}</p>
          <Link
            href={`/roommate/${request.sender?.id}`}
            className="text-xs font-semibold text-accent hover:underline"
          >
            View full profile →
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'pending') return (
    <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-600 flex-shrink-0">
      <Clock size={9} />
      Pending
    </span>
  )
  if (status === 'accepted') return (
    <span className="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-semibold text-green-600 flex-shrink-0">
      <CheckCircle2 size={9} />
      Accepted
    </span>
  )
  return (
    <span className="flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-xs font-semibold text-red-500 flex-shrink-0">
      <XCircle size={9} />
      Declined
    </span>
  )
}
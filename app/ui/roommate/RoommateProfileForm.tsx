'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { upsertRoommateProfile } from '@/lib/actions'
import {
  Users, BookOpen, Sparkles,
  CheckCircle2, ArrowRight, X
} from 'lucide-react'

const HABIT_OPTIONS = [
  'Early riser', 'Night owl', 'Non-smoker', 'Smoker',
  'Quiet environment', 'Social/outgoing', 'Pet-friendly',
  'No pets', 'Keeps space clean', 'Religious',
  'Reads often', 'Gamer', 'Music lover', 'Cooks at home',
]

type Props = {
  existing?: {
    school: string
    department?: string
    bio?: string
    habits?: string[]
  } | null
}

export default function RoommateProfileForm({ existing }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [school, setSchool] = useState(existing?.school ?? '')
  const [department, setDepartment] = useState(existing?.department ?? '')
  const [bio, setBio] = useState(existing?.bio ?? '')
  const [habits, setHabits] = useState<string[]>(existing?.habits ?? [])

  function toggleHabit(habit: string) {
    setHabits(prev =>
      prev.includes(habit)
        ? prev.filter(h => h !== habit)
        : prev.length < 6
          ? [...prev, habit]
          : prev
    )
  }

  function handleSubmit() {
    if (!school.trim()) {
      setError('School is required.')
      return
    }
    setError(null)

    startTransition(async () => {
      try {
        await upsertRoommateProfile({ school, department, bio, habits })
        setSuccess(true)
        setTimeout(() => router.push('/roommate'), 1500)
      } catch (e: unknown) {
        
        setError('Something went wrong. Please try again.')
      }
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-green-500" size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Profile saved!</h2>
          <p className="text-slate-500">Redirecting you to the roommate board...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-2">
            <Users size={16} />
            <span>Find Roomie</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {existing ? 'Update your profile' : 'Create your profile'}
          </h1>
          <p className="text-slate-500 mt-2">
            Tell potential roommates a bit about yourself. Be honest — the right match matters.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

          {/* School & Department */}
          <div className="p-8 border-b border-slate-50">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-accent/10 rounded-xl flex items-center justify-center">
                <BookOpen size={16} className="text-accent" />
              </div>
              <h2 className="font-bold text-slate-800">Academic info</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  School <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  placeholder="e.g. University of Lagos"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Habits */}
          <div className="p-8 border-b border-slate-50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Sparkles size={16} className="text-accent" />
                </div>
                <h2 className="font-bold text-slate-800">Your lifestyle</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {habits.length}/6 selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HABIT_OPTIONS.map(habit => {
                const selected = habits.includes(habit)
                return (
                  <button
                    key={habit}
                    type="button"
                    onClick={() => toggleHabit(habit)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all border ${
                      selected
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {selected && <X size={12} />}
                    {habit}
                  </button>
                )
              })}
            </div>
            {habits.length === 6 && (
              <p className="text-xs text-amber-500 mt-3 font-medium">
                Maximum 6 habits selected
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="p-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  About you
                </label>
                <span className="text-xs text-slate-400">{bio.length}/300</span>
              </div>
              <textarea
                value={bio}
                onChange={e => {
                  if (e.target.value.length <= 300) setBio(e.target.value)
                }}
                rows={4}
                placeholder="Write a short intro about yourself — your schedule, what kind of roommate you're looking for, any deal-breakers..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all ${
              isPending
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-accent hover:bg-accent/90 active:scale-95'
            }`}
          >
            {isPending ? 'Saving...' : existing ? 'Update profile' : 'Create profile'}
            {!isPending && <ArrowRight size={16} />}
          </button>
        </div>

        {/* Tip */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Your phone number will only be shared with students whose connect request you accept.
        </p>

      </div>
    </section>
  )
}
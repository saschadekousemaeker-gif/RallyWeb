'use client'

import { COUNTRY_FLAGS } from '@/lib/countryFlags'

interface Profile {
  full_name: string
  username: string
  padel_rating: number | null
  tennis_rating: number | null
  matches_played: number
  wins: number
  country: string | null
  sport: string[] | null
  created_at: string
}

interface Props {
  profile: Profile
  countryRank: number | null
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function formatMemberSince(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function ProfileClient({ profile, countryRank }: Props) {
  const winRate =
    profile.matches_played > 0
      ? ((profile.wins / profile.matches_played) * 100).toFixed(0)
      : '0'

  const playsPadel = profile.sport?.includes('padel') ?? false
  const playsTennis = profile.sport?.includes('tennis') ?? false

  // Show padel by default if they play both or only padel; otherwise tennis
  const primarySport = playsPadel ? 'padel' : 'tennis'
  const primaryRating =
    primarySport === 'padel' ? profile.padel_rating : profile.tennis_rating
  const ratingLabel =
    primarySport === 'padel' ? 'PADEL RATING' : 'TENNIS RATING'

  const countryFlag = profile.country
    ? COUNTRY_FLAGS[profile.country] ?? ''
    : ''

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <header className="max-w-[480px] w-full mx-auto px-5 pt-6 pb-2 flex items-center justify-between">
        <a href="https://rallyrating.app" className="text-2xl font-black tracking-tight">
          <span className="text-white">RALL</span>
          <span className="text-[#CCFF00]">Y</span>
        </a>
        <a href="https://rallyrating.app" className="text-[#888888] text-xs hover:text-white transition-colors">
          ← Back to Rally
        </a>
      </header>

      {/* Main content */}
      <main className="max-w-[480px] w-full mx-auto px-5 pt-8 pb-10 flex flex-col gap-6">
        {/* Profile section */}
        <section className="flex flex-col items-center gap-3 text-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-2 border-[#CCFF00] flex items-center justify-center">
            <span className="text-[#CCFF00] text-2xl font-bold">
              {getInitials(profile.full_name)}
            </span>
          </div>

          {/* Name */}
          <div>
            <h1 className="text-white text-2xl font-bold leading-tight">
              {profile.full_name}
            </h1>
            <p className="text-[#888888] text-sm mt-0.5">@{profile.username}</p>
          </div>

          {/* Country + member since */}
          <div className="flex flex-col items-center gap-1">
            {profile.country && (
              <p className="text-[#888888] text-sm">
                {countryFlag} {profile.country}
              </p>
            )}
            <p className="text-[#888888] text-xs">
              Member since {formatMemberSince(profile.created_at)}
            </p>
          </div>
        </section>

        {/* Rating card */}
        <section className="bg-[#1A1A1A] rounded-2xl px-6 py-5 flex flex-col items-center gap-2">
          <span className="text-[#888888] text-xs font-semibold tracking-widest uppercase">
            {ratingLabel}
          </span>
          <span className="text-[#CCFF00] text-7xl font-black leading-none">
            {primaryRating ?? '—'}
          </span>
          {playsPadel && playsTennis && (
            <span className="text-[#888888] text-xs mt-1">
              Tennis: {profile.tennis_rating ?? '—'}
            </span>
          )}
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-3 gap-3">
          <StatCard
            value={`${winRate}%`}
            label="WIN RATE"
          />
          <StatCard
            value={String(profile.matches_played ?? 0)}
            label="MATCHES"
          />
          <StatCard
            value={countryRank != null ? `#${countryRank}` : '—'}
            label={profile.country ? `IN ${profile.country.toUpperCase()}` : 'RANK'}
          />
        </section>

        {/* Footer CTA */}
        <section className="flex flex-col items-center gap-4 pt-4">
          <p className="text-[#888888] text-sm">Get your Rally rating</p>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#CCFF00] text-black font-bold text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Download Rally
          </a>
        </section>
      </main>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl px-3 py-4 flex flex-col items-center gap-1">
      <span className="text-white text-xl font-bold leading-tight">{value}</span>
      <span className="text-[#888888] text-[10px] font-semibold tracking-widest uppercase text-center">
        {label}
      </span>
    </div>
  )
}

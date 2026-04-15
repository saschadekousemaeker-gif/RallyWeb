import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import ProfileClient from './ProfileClient'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  console.log('[Supabase] URL (first 30):', url?.slice(0, 30))
  console.log('[Supabase] Key present:', !!key)
  return createClient(url!, key!)
}

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
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = getSupabaseClient()
  const { data } = await supabase
    .from('profiles')
    .select('full_name, username, padel_rating, tennis_rating')
    .eq('username', params.username)
    .single()

  if (!data) {
    return { title: 'Player not found — Rally' }
  }

  const rating = data.padel_rating ?? data.tennis_rating
  return {
    title: `${data.full_name} (@${data.username}) — Rally`,
    description: `${data.full_name}'s Rally profile. Rating: ${rating ?? 'N/A'}`,
    openGraph: {
      title: `${data.full_name} on Rally`,
      description: `Rating: ${rating ?? 'N/A'} · Rally player profile`,
    },
  }
}

export default async function ProfilePage({ params }: Props) {
  console.log('[ProfilePage] username:', params.username)
  const supabase = getSupabaseClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      'full_name, username, padel_rating, tennis_rating, matches_played, wins, country, sport, created_at'
    )
    .eq('username', params.username)
    .single()

  console.log('[ProfilePage] data:', profile)
  console.log('[ProfilePage] error:', JSON.stringify(error))

  if (error || !profile) {
    notFound()
  }

  // Fetch country rank: count profiles in same country with higher padel_rating
  let countryRank: number | null = null
  if (profile.country && profile.padel_rating != null) {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('country', profile.country)
      .gt('padel_rating', profile.padel_rating)

    countryRank = (count ?? 0) + 1
  }

  return <ProfileClient profile={profile as Profile} countryRank={countryRank} />
}

import React from 'react'
import { ProfileCard } from './ProfileCard'
import { ProfileStats } from './ProfileStats'

interface Profile {
  did: string
  handle: string
  displayName: string
  avatar: string
  createdAt: string
  description: string | undefined
  banner?: string | undefined
  followersCount: string
  followsCount: string
  postsCount: string
}

const getProfile = async (did: string) => {
  const getProfileURL = process.env.URL + '/api/user/' + did + "/profile"
  const getProfileResponse = await fetch(getProfileURL)
  const profile: Profile = await getProfileResponse.json()

  return profile
}

export const Profile = async ({ did }: { did: string}) => {
  const profile = await getProfile(did)

  const profileStats = {
    followersCount: profile.followersCount,
    followsCount: profile.followsCount,
    postsCount: profile.postsCount,
    createdAt: profile.createdAt
  }

  const profileCard = {
    handle: profile.handle,
    displayName: profile.displayName,
    avatar: profile.avatar,
    description: profile.description,
    createdAt: profile.createdAt,
    banner: profile.banner
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

      {/* Stats Section (Full Width) */}
      <div className="w-full mb-8">
        <ProfileStats profileStats={profileStats}/>
      </div>

      {/* Chart Section */}
      <div className="w-full">
        <ProfileCard profileCard={profileCard}/>
      </div>
    </div>
  )
}

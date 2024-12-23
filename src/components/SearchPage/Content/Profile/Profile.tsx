import React from 'react'
import { ProfileStats } from './ProfileStats'
import { IProfile } from '@/interfaces/IProfile'
import { ProfileCard } from './ProfileCard'

const getProfile = async (did: string) => {
  const getProfileURL = process.env.URL + '/api/user/' + did + "/profile"
  const getProfileResponse = await fetch(getProfileURL, {next: {revalidate: 3600}})
  const profile: IProfile = await getProfileResponse.json()

  return profile
}

export const Profile = async ({ did }: { did: string}) => {
  const profile = await getProfile(did)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

      {/* Stats Section (Full Width) */}
      <div className="w-full mb-8">
        <ProfileStats profile={profile}/>
      </div>

      {/* Chart Section */}
      <div className="w-full">
        <ProfileCard profile={profile}/>
      </div>
    </div>
  )
}

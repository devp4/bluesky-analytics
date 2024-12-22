import React from 'react'
import { Button } from "@/components/shadcn/button";
import { Card, CardTitle, CardContent } from '@/components/shadcn/card';
import { Avatar, AvatarImage } from '@/components/shadcn/avatar';
import Image from 'next/image';
import { ExternalLinkIcon } from 'lucide-react';

interface ProfileCard {
  handle: string,
  displayName: string,
  avatar: string,
  description: string | undefined,
  createdAt: string,
  banner: string | undefined
}

export const ProfileCard = ({ profileCard }: {profileCard: ProfileCard}) => {
  if (profileCard.description === undefined) {
    profileCard.description = ""
  }

  if (profileCard.displayName === "" || profileCard.displayName === undefined) {
    profileCard.displayName = profileCard.handle
  }

  return (
    <div className="w-full">
      <Card className="rounded-lg shadow-md overflow-hidden">
        {/* Banner Section */}
        <div className="relative w-full h-32">
          {profileCard.banner ? 
            <Image
              src={profileCard.banner}
              alt="Banner Image"
              fill={true}
              className="w-full h-full object-cover"
            /> :
            
            <div className="w-full h-full bg-[rgb(30,41,54)]"></div>
          }
        </div>

        {/* Profile Content */}
        <div className="flex items-center px-6 -mt-12 gap-6">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-4 rounded-full">
            <AvatarImage src={profileCard.avatar}></AvatarImage>
          </Avatar>

          {/* User Info */}
        </div>

        {/* Profile Description */}
        <CardContent className="mt-3 px-6 pb-6">
          <div>
            <CardTitle className="text-xl font-bold truncate ...">
              {`${profileCard.displayName} | @${profileCard.handle}`}
            </CardTitle>
          </div>
          <p className="mt-2 whitespace-pre-line">
            {profileCard.description}
          </p>
          <div className="flex justify-end mt-5">
            <Button className="rounded-full h-9">
              <a href={`https://bsky.app/profile/${profileCard.handle}`}>Visit</a>
              <ExternalLinkIcon></ExternalLinkIcon>
            </Button>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}

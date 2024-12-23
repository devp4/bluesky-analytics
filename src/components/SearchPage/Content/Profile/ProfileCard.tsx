import React from 'react'
import { Button } from "@/components/shadcn/button";
import { Card, CardTitle, CardContent } from '@/components/shadcn/card';
import { Avatar, AvatarImage } from '@/components/shadcn/avatar';
import Image from 'next/image';
import { ExternalLinkIcon } from 'lucide-react';
import { IProfile } from '@/interfaces/IProfile';

export const ProfileCard = ({ profile }: {profile: IProfile}) => {
  if (profile.description === undefined) {
    profile.description = ""
  }

  if (profile.displayName === "" || profile.displayName === undefined) {
    profile.displayName = profile.handle
  }

  return (
    <div className="w-full">
      <Card className="rounded-lg shadow-md overflow-hidden">
        {/* Banner Section */}
        <div className="relative w-full h-32">
          {profile.banner ? 
            <Image
              src={profile.banner}
              alt="Banner Image"
              fill={true}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            /> :
            
            <div className="w-full h-full bg-[rgb(30,41,54)]"></div>
          }
        </div>

        {/* Profile Content */}
        <div className="flex items-center px-6 -mt-12 gap-6">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-4 rounded-full">
            <AvatarImage src={profile.avatar}></AvatarImage>
          </Avatar>

          {/* User Info */}
        </div>

        {/* Profile Description */}
        <CardContent className="mt-3 px-6 pb-6">
          <div>
            <CardTitle className="text-xl font-bold truncate ...">
              {`${profile.displayName} | @${profile.handle}`}
            </CardTitle>
          </div>
          <p className="mt-2 whitespace-pre-line">
            {profile.description}
          </p>
          <div className="flex justify-end mt-5">
            <Button className="rounded-full h-9">
              <a href={`https://bsky.app/profile/${profile.handle}`}>Visit</a>
              <ExternalLinkIcon></ExternalLinkIcon>
            </Button>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}

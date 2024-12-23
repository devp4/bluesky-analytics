import React from 'react'
import { Card, CardTitle, CardDescription } from '@/components/shadcn/card';
import { IProfile } from '@/interfaces/IProfile';

function getAge(createdAt: string): string {
  const now = new Date(); // Get the current date
  const createdDate = new Date(createdAt); // Parse the createdAt date

  let years = now.getFullYear() - createdDate.getFullYear();
  let months = now.getMonth() - createdDate.getMonth();
  let days = now.getDate() - createdDate.getDate();

  // Adjust for negative months or days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
    days += lastMonth.getDate(); // Add days of the last month
  }

  if (months < 0) {
    years--;
    months += 12; // Adjust the months to be positive
  }

  return `${years}Y ${months}M ${days}D`;
}

export const ProfileStats = ({ profile }: {profile: IProfile}) => {
  return (
    <Card className="w-full p-4 rounded-md">
      <div className="flex flex-wrap justify-around gap-4 sm:gap-8">
        {/* Followers */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Followers</CardDescription>
          <CardTitle>{profile.followersCount.toLocaleString()}</CardTitle>
        </div>
        {/* Following */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Following</CardDescription>
          <CardTitle>{profile.followsCount.toLocaleString()}</CardTitle>
        </div>
        {/* Posts */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Content</CardDescription>
          <CardTitle>{profile.postsCount.toLocaleString()}</CardTitle>
        </div>
        {/* Account Age */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Account Age</CardDescription>
          <CardTitle className="truncate">{getAge(profile.createdAt)}</CardTitle>
        </div>
      </div>
    </Card>
  )
}

import React from 'react';
import { Card, CardDescription, CardTitle } from '@/components/shadcn/card';
import { IEngangementStats } from '@/interfaces/IUserContent';

export const TotalEngagementStats = ({ totalEngagement }: { totalEngagement: IEngangementStats}) => {
  return (
    <Card className="w-full p-4 rounded-md">
      <div className="flex flex-wrap justify-around gap-4 sm:gap-8">
        {/* Posts */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Likes</CardDescription>
          <CardTitle>{totalEngagement.likes.toLocaleString()}</CardTitle>
        </div>
        {/* Replies */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Replies</CardDescription>
          <CardTitle>{totalEngagement.replies.toLocaleString()}</CardTitle>
        </div>
        {/* Reposts */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Reposts</CardDescription>
          <CardTitle>{totalEngagement.reposts.toLocaleString()}</CardTitle>
        </div>
        {/* Quotes */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Quotes</CardDescription>
          <CardTitle className="truncate">{totalEngagement.quotes.toLocaleString()}</CardTitle>
        </div>
      </div>
    </Card>
  );
};

import React from 'react';
import { Card, CardDescription, CardTitle } from '@/components/shadcn/card';
import { ContentStats } from '@/interfaces/IUserContent';

export const TotalContentStats = ({ totalContentStats }: { totalContentStats: ContentStats}) => {
  return (
    <Card className="w-full p-4 rounded-md">
      <div className="flex flex-wrap justify-around gap-4 sm:gap-8">
        {/* Posts */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Posts</CardDescription>
          <CardTitle>{totalContentStats.posts}</CardTitle>
        </div>
        {/* Replies */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Replies</CardDescription>
          <CardTitle>{totalContentStats.replies}</CardTitle>
        </div>
        {/* Reposts */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Reposts</CardDescription>
          <CardTitle>{totalContentStats.reposts}</CardTitle>
        </div>
        {/* Quotes */}
        <div className="flex-1 min-w-[120px] grid gap-1 text-center">
          <CardDescription>Quotes</CardDescription>
          <CardTitle className="truncate">{totalContentStats.quotes}</CardTitle>
        </div>
      </div>
    </Card>
  );
};

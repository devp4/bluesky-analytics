import React from 'react';
import { TotalContentStats } from './TotalContentStats';
import { TotalContentChart } from './TotalContentChart';
import { ContentStats } from '@/interfaces/IUserContent';

interface UserContent {
  contentStatsByDate: Record<string, ContentStats>,
  cumulativeStatsByDate: ContentStats[]
}

const getUserContent = async (did: string) => {
  const getUserContentURL = process.env.URL + '/api/user/' + did + "/content"
  const getUserContentResponse = await fetch(getUserContentURL)

  const userContent: UserContent = await getUserContentResponse.json()
  return userContent
}

export const UserContent = async ({ did }: {did: string}) => {
  const userContent = await getUserContent(did)
  // const contentStatsByDate = userContent.contentStatsByDate
  const cumulativeStatsByDate = userContent.cumulativeStatsByDate
  const totalStats = cumulativeStatsByDate[cumulativeStatsByDate.length - 1]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">User Content</h2>

      {/* Stats Section (Full Width) */}
      <div className="w-full mb-8">
        <TotalContentStats totalContentStats={totalStats}/>
      </div>

      {/* Chart Section */}
      <div className="w-full">
        <TotalContentChart cumulativeStatsByDate={cumulativeStatsByDate}/>
      </div>
    </div>
  );
};

import React from 'react';
import { TotalContentStats } from './TotalContentStats';
import { TotalContentChart } from './TotalContentChart';
import { IContentStats } from '@/interfaces/IUserContent';
import { RelativeContentChart } from './RelativeContentChart';

interface UserContent {
  contentStatsByDate: Record<string, IContentStats>
  contentStatsByDateOrdered: IContentStats[]
  cumulativeStatsByDate: IContentStats[]
}

const getUserContent = async (did: string) => {
  const getUserContentURL = process.env.URL + '/api/user/' + did + "/content"
  const getUserContentResponse = await fetch(getUserContentURL, {next: {revalidate: 3600}})

  const userContent: UserContent = await getUserContentResponse.json()
  return userContent
}

export const UserContent = async ({ did }: {did: string}) => {
  const userContent = await getUserContent(did)
  const cumulativeStatsByDate = userContent.cumulativeStatsByDate
  const totalStats = cumulativeStatsByDate[cumulativeStatsByDate.length - 1]
  
  const contentStatsByDateOrdered = userContent.contentStatsByDateOrdered
  const contentStatsByDate = userContent.contentStatsByDate

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">User Content</h2>

      {/* Stats Section (Full Width) */}
      <div className="w-full mb-8">
        <TotalContentStats totalContentStats={totalStats}/>
      </div>

      {/* Chart Section */}
      <div className="w-full mb-8">
        <TotalContentChart 
          cumulativeStatsByDate={cumulativeStatsByDate}/>
      </div>

      {/* Relative Content */}
      <div className="w-full">
        <RelativeContentChart 
          contentStatsByDateOrdered={contentStatsByDateOrdered}
          contentStatsByDate={contentStatsByDate}
        />
      </div>
    </div>
  );
};

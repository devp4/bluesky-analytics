import React from 'react'
import { ContentByDay } from './ContentByDay'
import { ContentByMonth } from './ContentByMonth'
import { IContentStats } from '@/interfaces/IUserContent'

export const ContentBarCharts = ({contentStatsByDateOrdered}: {
  contentStatsByDateOrdered: IContentStats[]
}) => {


  const getContentByDayMonth = () => {

    // Initialize days and months with default data
    const daysData: IContentStats[] = Array.from({ length: 7 }, () => ({
      date: "",
      posts: 0,
      replies: 0,
      quotes: 0,
      reposts: 0,
    }));
  
    const monthsData: IContentStats[] = Array.from({ length: 12 }, () => ({
      date: "",
      posts: 0,
      replies: 0,
      quotes: 0,
      reposts: 0,
    }));
  
    // Iterate through data to populate days and months
    for (const data of contentStatsByDateOrdered) {
      const date = new Date(data.date);
      const day: number = date.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
      const month: number = date.getMonth(); // Month index (0 = January, 11 = December)
  
      // Aggregate stats for days
      daysData[day].posts += data.posts;
      daysData[day].replies += data.replies;
      daysData[day].quotes += data.quotes;
      daysData[day].reposts += data.reposts;
  
      // Aggregate stats for months
      monthsData[month].posts += data.posts;
      monthsData[month].replies += data.replies;
      monthsData[month].quotes += data.quotes;
      monthsData[month].reposts += data.reposts;
    }
  
    // Return the aggregated data
    return { daysData, monthsData };
  };

  const { daysData, monthsData } = getContentByDayMonth();

  return (
    <>
      <div className="w-full md:w-1/2">
        <ContentByDay daysData={daysData}/>
      </div>
      <div className="w-full md:w-1/2">
        <ContentByMonth monthsData={monthsData}/>
      </div>
    </>
  )
}

import React from 'react'
import { IEngangementStats } from '@/interfaces/IUserContent'
import { EngagementByDay } from './ContentByDay'
import { EngagementByMonth } from './ContentByMonth'

export const EngagementBarCharts = ({engagementStatsByDateOrdered}: {
  engagementStatsByDateOrdered: IEngangementStats[]
}) => {


  const getEngagmentByDayMonth = () => {

    // Initialize days and months with default data
    const daysData: IEngangementStats[] = Array.from({ length: 7 }, () => ({
      date: "",
      likes: 0,
      replies: 0,
      quotes: 0,
      reposts: 0,
    }));
  
    const monthsData: IEngangementStats[] = Array.from({ length: 12 }, () => ({
      date: "",
      likes: 0,
      replies: 0,
      quotes: 0,
      reposts: 0,
    }));
  
    // Iterate through data to populate days and months
    for (const data of engagementStatsByDateOrdered) {
      const date = new Date(data.date);
      const day: number = date.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
      const month: number = date.getMonth(); // Month index (0 = January, 11 = December)
  
      // Aggregate stats for days
      daysData[day].likes += data.likes;
      daysData[day].replies += data.replies;
      daysData[day].quotes += data.quotes;
      daysData[day].reposts += data.reposts;
  
      // Aggregate stats for months
      monthsData[month].likes += data.likes;
      monthsData[month].replies += data.replies;
      monthsData[month].quotes += data.quotes;
      monthsData[month].reposts += data.reposts;
    }
  
    // Return the aggregated data
    return { daysData, monthsData };
  };

  const { daysData, monthsData } = getEngagmentByDayMonth();

  return (
    <>
      <div className="w-full md:w-1/2">
        <EngagementByDay daysData={daysData}/>
      </div>
      <div className="w-full md:w-1/2">
        <EngagementByMonth monthsData={monthsData}/>
      </div>
    </>
  )
}

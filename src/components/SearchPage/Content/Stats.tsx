import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs"

import { IContentStats, IEngangementStats } from "@/interfaces/IUserContent"
import { ContentBarCharts } from "./UserContent/ContentBarCharts/ContentBarCharts"
import { DailyContentChart } from "./UserContent/DailyContentChart"
import { TotalContentChart } from "./UserContent/TotalContentChart"
import { TotalContentStats } from "./UserContent/TotalContentStats"
import { TotalEngagementStats } from "./UserEngagement/TotalEngagementStats"
import { TotalEngagementChart } from "./UserEngagement/TotalEngagementChart"
import { DailyEngagementChart } from "./UserEngagement/DailyEngagementChart"
import { EngagementBarCharts } from "./UserEngagement/EngagementBarCharts/EngagementBarCharts"

interface Stats {
  contentStatsByDate: Record<string, IContentStats>
  contentStatsByDateOrdered: IContentStats[]
  cumulativeStatsByDate: IContentStats[]

  engagementStatsByDate: Record<string, IEngangementStats>
  engagementStatsByDateOrdered: IEngangementStats[]
  cumulativeEngagementStatsByDate: IEngangementStats[]
}

const getStats = async (did: string) => {
  const getUserContentURL = process.env.URL + '/api/user/' + did + "/content"
  const getUserContentResponse = await fetch(getUserContentURL, { next: { revalidate: 3600 } })
  
  const userContent: Stats = await getUserContentResponse.json()
  return userContent
}

export const Stats = async ({ did }: {did: string}) => {
  const userContent = await getStats(did)
  const cumulativeStatsByDate = userContent.cumulativeStatsByDate
  const totalStats = cumulativeStatsByDate[cumulativeStatsByDate.length - 1]
  const contentStatsByDateOrdered = userContent.contentStatsByDateOrdered
  const contentStatsByDate = userContent.contentStatsByDate
  
  const cumulativeEngagemntByDate = userContent.cumulativeEngagementStatsByDate
  const totalEngagement = cumulativeEngagemntByDate[cumulativeEngagemntByDate.length - 1]
  const engagementStatsByDateOrdered = userContent.engagementStatsByDateOrdered
  const engagementStatsByDate = userContent.engagementStatsByDate


  return (
    <Tabs defaultValue="content">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        {/* User Content */}
        <div>
          <h2 className="text-2xl font-bold mb-6 mt-6 text-center">User Content</h2>
    
          {/* Stats Section (Full Width) */}
          <div className="w-full mb-8">
            <TotalContentStats totalContentStats={totalStats} />
          </div>
    
          {/* Chart Section */}
          <div className="w-full mb-8">
            <TotalContentChart cumulativeStatsByDate={cumulativeStatsByDate} />
          </div>
    
          {/* Daily Content */}
          <div className="w-full mb-8">
            <DailyContentChart
              contentStatsByDateOrdered={contentStatsByDateOrdered}
              contentStatsByDate={contentStatsByDate}
            />
          </div>
    
          <div className="w-full flex flex-wrap md:flex-nowrap gap-4">
            <ContentBarCharts contentStatsByDateOrdered={contentStatsByDateOrdered}/>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="engagement">
        {/* User Engagement */}
        <div>
          <h2 className="text-2xl font-bold mb-6 mt-6 text-center">User Engagement</h2>
    
          {/* Stats Section (Full Width) */}
          <div className="w-full mb-8">
            <TotalEngagementStats totalEngagement={totalEngagement} />
          </div>
    
          {/* Chart Section */}
          <div className="w-full mb-8">
            <TotalEngagementChart cumulativeEngagemntByDate={cumulativeEngagemntByDate} />
          </div>
    
          {/* Daily Content */}
          <div className="w-full mb-8">
            <DailyEngagementChart
              engagementStatsByDateOrdered={engagementStatsByDateOrdered}
              engagementStatsByDate={engagementStatsByDate}
            />
          </div>
    
          <div className="w-full flex flex-wrap md:flex-nowrap gap-4">
            <EngagementBarCharts engagementStatsByDateOrdered={engagementStatsByDateOrdered}/>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

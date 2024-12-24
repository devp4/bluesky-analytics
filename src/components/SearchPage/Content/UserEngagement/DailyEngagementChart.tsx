"use client"

import * as React from "react"
import { CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"

import { IEngangementStats } from "@/interfaces/IUserContent"

const chartConfig = {
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-5))",
  },
  replies: {
    label: "Replies",
    color: "hsl(var(--chart-1))",
  },
  reposts: {
    label: "Reposts",
    color: "hsl(var(--chart-3))",
  },
  quotes: {
    label: "Quotes",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig


export const DailyEngagementChart = ({ engagementStatsByDateOrdered, engagementStatsByDate }: 
{   engagementStatsByDateOrdered: IEngangementStats[]
  engagementStatsByDate: Record<string, IEngangementStats>
}) => {

  const selectTypeLabels = [
    { value: "all", label: "All" },
    { value: "likes", label: "Likes" },
    { value: "replies", label: "Replies" },
    { value: "reposts", label: "Reposts" },
    { value: "quotes", label: "Quotes" },
  ]

  const selectTimeLabels = [
    { value: "7d", label: "7 Days" },
    { value: "14d", label: "14 Days" },
    { value: "30d", label: "1 Month" },
    { value: "180d", label: "6 Months" },
    { value: "365d", label: "1 Year" },
    { value: "all-time", label: "All Time" },
  ]

  const [selectedTypeLabel, setSelectedTypeLabel] = React.useState("all")
  const [selectedTimeLabel, setSelectedTimeLabel] = React.useState("7d")

  const filterData = () => {
    let daysToSubtract = 7
    if (selectedTimeLabel === "14d") {
      daysToSubtract = 14
    } 
    else if (selectedTimeLabel === "30d") {
      daysToSubtract = 30
    }
    else if (selectedTimeLabel === "180d") {
      daysToSubtract = 180
    }
    else if (selectedTimeLabel === "365d") {
      daysToSubtract = 365
    }
    

    const endDate = new Date(Date.now())
    let startDate = new Date(endDate);

    if (selectedTimeLabel === "all-time") {
      startDate = new Date(engagementStatsByDateOrdered[0].date)
      startDate.setDate(startDate.getDate() - 2)
    }
    else {
      startDate.setDate(endDate.getDate() - daysToSubtract);
    }

    const arr: IEngangementStats[] = [];
    
    for(const dt=new Date(startDate); dt<=new Date(endDate); dt.setDate(dt.getDate()+1)){
      const newDate = new Date(dt).toDateString()
      if (newDate in engagementStatsByDate) {
        const content = engagementStatsByDate[newDate]
        arr.push(content)
      }
      else {
        const content: IEngangementStats = {
          date: newDate,
          likes: 0,
          replies: 0,
          quotes: 0,
          reposts: 0
        }

        arr.push(content);
      }
    }

    return arr
  }

  const chartData = filterData()

  type EngagementType = keyof typeof chartConfig;
  const contentTypes: EngagementType[] = ["likes", "replies", "reposts", "quotes"]

  return (
    <Card>
      {/* Top Label */}
      <CardHeader className="flex-row justify-between gap-2 space-y-0 border-b py-5 sm:flex-row items-center">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-left">Daily</CardTitle>
          <CardDescription className="text-left">
            Showing daily engagement
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-4 sm:flex-nowrap justify-end">
        <Select
            value={selectedTypeLabel}
            onValueChange={setSelectedTypeLabel}
            defaultValue={selectedTypeLabel}>

            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
            >
              <SelectValue placeholder="posts" />
            </SelectTrigger>
            <SelectContent>
              {selectTypeLabels.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedTimeLabel}
            onValueChange={setSelectedTimeLabel}
            defaultValue={selectedTimeLabel}>

            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
            >
              <SelectValue placeholder="posts" />
            </SelectTrigger>
            <SelectContent>
              {selectTimeLabels.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              interval={chartData.length > 15 ? "equidistantPreserveStart" : "preserveEnd"}
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={64}
              tickFormatter={(value) => {
                const date = new Date(value);

                // Use toLocaleDateString and replace spaces with slashes
                return date
                  .toLocaleDateString('default', { month: "short", day: "2-digit", year: "2-digit" })
                  .replace(/, /g, '/')
                  .replace(' ', '/');
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              width={40}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            {contentTypes.map((contentType) => {
              const chartItem = chartConfig[contentType]
              if (contentType === selectedTypeLabel || selectedTypeLabel === "all") {
                return (
                  <Line
                    key={contentType}
                    dataKey={contentType}
                    type="linear"
                    stroke={chartItem.color}
                    strokeWidth={2}
                    dot={false}
                  />
                )
              }
            })}
          </LineChart>

        </ChartContainer>
      </CardContent>
    </Card>
  )
}

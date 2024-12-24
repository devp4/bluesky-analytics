"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart"
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

export function EngagementByDay({ daysData }: {
  daysData: IEngangementStats[]
}) {

  const dayConverter = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const convertToChartData = (): IEngangementStats[] => {
    const chartData = []
    for (let i = 0; i < daysData.length; i++) {
      const chart = {
        "day": dayConverter[i],
        ...daysData[i]
      }

      chartData.push(chart)
    }

    return chartData
  }

  const chartData = convertToChartData()

  const getMostContentDay = () => {
    let mostDay = "Sunday"
    let maxSum = -1
    for (let i = 0; i < chartData.length; i++) {
      const data = chartData[i]
      const sum = data.likes + data.replies + data.quotes + data.reposts
      if (sum > maxSum) {
        maxSum = sum
        mostDay = dayConverter[i]
      }
    }

    return mostDay
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content by Day</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              width={40}
              allowDecimals={false}
              tickFormatter={(value) => {
                return new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short"
                }).format(value)
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="likes"
              fill={chartConfig.likes.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="replies"
              fill={chartConfig.replies.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="quotes"
              fill={chartConfig.quotes.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="reposts"
              fill={chartConfig.reposts.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {`Highest engagement activity day is ${getMostContentDay()}`}
        </div>
      </CardFooter>
    </Card>
  )
}

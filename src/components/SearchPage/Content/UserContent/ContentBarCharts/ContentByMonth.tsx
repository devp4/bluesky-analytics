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
import { IContentStats } from "@/interfaces/IUserContent"


const chartConfig = {
  posts: {
    label: "Posts",
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

export function ContentByMonth({ monthsData }: {
  monthsData: IContentStats[]
}) {

  const monthConverter = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  

  const convertToChartData = (): IContentStats[] => {
    const chartData = []
    for (let i = 0; i < monthsData.length; i++) {
      const chart = {
        "month": monthConverter[i],
        ...monthsData[i]
      }

      chartData.push(chart)
    }

    return chartData
  }

  const chartData = convertToChartData()

  const getMostContentMonth = () => {
    let mostMonth = "January"
    let maxSum = -1
    for (let i = 0; i < chartData.length; i++) {
      const data = chartData[i]
      const sum = data.posts + data.replies + data.quotes + data.reposts
      if (sum > maxSum) {
        maxSum = sum
        mostMonth = monthConverter[i]
      }
    }

    return mostMonth
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content by Month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
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
              dataKey="posts"
              fill={chartConfig.posts.color}
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
          {`Highest content activity month is ${getMostContentMonth()}`}
        </div>
      </CardFooter>
    </Card>
  )
}

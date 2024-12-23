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

export const TotalContentChart = ({ cumulativeStatsByDate }: { cumulativeStatsByDate: IContentStats[] }) => {

  const selectLabels = [
    { value: "all", label: "All" },
    { value: "posts", label: "Posts" },
    { value: "replies", label: "Replies" },
    { value: "reposts", label: "Reposts" },
    { value: "quotes", label: "Quotes" },
  ]

  const [selectedLabel, setSelectedLabel] = React.useState("all")
  type ContentType = keyof typeof chartConfig;
  const contentTypes: ContentType[] = ["replies", "posts", "reposts", "quotes"]

  return (
    <Card>
      {/* Top Label */}
      <CardHeader className="flex-row justify-between gap-2 space-y-0 border-b py-5 sm:flex-row items-center">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-left">Cumulative</CardTitle>
          <CardDescription className="text-left">
            Showing cumulative content over time
          </CardDescription>
        </div>
        <Select
          value={selectedLabel}
          onValueChange={setSelectedLabel}
          defaultValue={selectedLabel}>

          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
          >
            <SelectValue placeholder="posts" />
          </SelectTrigger>
          <SelectContent>
            {selectLabels.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Chart */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={cumulativeStatsByDate}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              interval={cumulativeStatsByDate.length > 14 ? "equidistantPreserveStart" : "preserveEnd"}
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
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            {contentTypes.map((contentType) => {
              const chartItem = chartConfig[contentType]
              if (contentType === selectedLabel || selectedLabel === "all") {
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
              }})}
          </LineChart>

        </ChartContainer>
      </CardContent>
    </Card>
  )
}

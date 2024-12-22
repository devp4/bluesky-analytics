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

import { ContentStats } from "@/interfaces/IUserContent"

const chartConfig = {
  replies: {
    label: "Replies",
    color: "hsl(var(--chart-1))",
  },
  posts: {
    label: "Posts",
    color: "hsl(var(--chart-5))",
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

export const TotalContentChart = ({ cumulativeStatsByDate }: { cumulativeStatsByDate: ContentStats[] }) => {

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
          <CardTitle>Cumulative</CardTitle>
          <CardDescription>
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
              width={30}
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
                    type="natural" 
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


// <AreaChart data={filteredData}>
// <defs>
//   <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
//     <stop
//       offset="5%"
//       stopColor="var(--color-desktop)"
//       stopOpacity={0.8}
//     />
//     <stop
//       offset="95%"
//       stopColor="var(--color-desktop)"
//       stopOpacity={0.1}
//     />
//   </linearGradient>
//   <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
//     <stop
//       offset="5%"
//       stopColor="var(--color-mobile)"
//       stopOpacity={0.8}
//     />
//     <stop
//       offset="95%"
//       stopColor="var(--color-mobile)"
//       stopOpacity={0.1}
//     />
//   </linearGradient>
// </defs>
// <CartesianGrid vertical={false} />
// <XAxis
//   dataKey="date"
//   tickLine={false}
//   axisLine={false}
//   tickMargin={8}
//   minTickGap={32}
//   tickFormatter={(value) => {
//     const date = new Date(value)
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     })
//   }}
// />
// <YAxis
//   tickLine={false}
//   axisLine={false}
//   tickMargin={8}
//   tickCount={5}
//   width={40}
// />
// <ChartTooltip
//   cursor={false}
//   content={(
//     <ChartTooltipContent
//       labelFormatter={(value) => {
//         return new Date(value).toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//         })
//       }}
//       indicator="dot"
//     />
//   )}
// />
// <Area
//   dataKey="mobile"
//   type="natural"
//   fill="url(#fillMobile)"
//   stroke="var(--color-mobile)"
//   stackId="a"
// />
// <Area
//   dataKey="desktop"
//   type="natural"
//   fill="url(#fillDesktop)"
//   stroke="var(--color-desktop)"
//   stackId="a"
// />
// </AreaChart>

// export function Component() {
//   return (
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey="desktop"
//               type="natural"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>

//   )
// }


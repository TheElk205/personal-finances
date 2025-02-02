"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
} satisfies ChartConfig

export type ChartData = {
    bookingMonth: string
    amount: number
}

export type ChartProps = {
    chartData: ChartData[]
}

export default function ExpenseBars(props: ChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Negative</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={props.chartData}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel hideIndicator />}
                        />
                        <Bar dataKey="amount">
                            <LabelList position="top" dataKey="bookingMonth" fillOpacity={1} />
                            {props.chartData.map((item) => (
                                <Cell
                                    key={item.bookingMonth}
                                    fill={
                                        item.amount > 0
                                            ? "green"
                                            : "red"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col items-start gap-2 text-sm">*/}
            {/*    <div className="flex gap-2 font-medium leading-none">*/}
            {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
            {/*    </div>*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}
        </Card>
    )
}

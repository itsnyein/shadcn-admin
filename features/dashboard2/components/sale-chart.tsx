"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboard2SearchParams } from "@/hooks/search-params";
import { useCallback } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const salesData = [
  { month: "Jan", sales: 12500, target: 15000 },
  { month: "Feb", sales: 18200, target: 15000 },
  { month: "Mar", sales: 16800, target: 15000 },
  { month: "Apr", sales: 22400, target: 20000 },
  { month: "May", sales: 24600, target: 20000 },
  { month: "Jun", sales: 28200, target: 25000 },
  { month: "Jul", sales: 31500, target: 25000 },
  { month: "Aug", sales: 29800, target: 25000 },
  { month: "Sep", sales: 33200, target: 30000 },
  { month: "Oct", sales: 35100, target: 30000 },
  { month: "Nov", sales: 38900, target: 35000 },
  { month: "Dec", sales: 42300, target: 35000 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--primary)",
  },
  target: {
    label: "Target",
    color: "var(--primary)",
  },
};

export function SalesChart() {
  const [{ salesRange: timeRange }, setSearchParams] =
    useDashboard2SearchParams();
  const setTimeRange = useCallback(
    (value: string) =>
      setSearchParams({ salesRange: value === "12m" ? null : value }),
    [setSearchParams],
  );

  return (
    <Card className="cursor-pointer bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
        <div>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Monthly sales vs targets</CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 sm:gap-0 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m" className="cursor-pointer">
                Last 3 months
              </SelectItem>
              <SelectItem value="6m" className="cursor-pointer">
                Last 6 months
              </SelectItem>
              <SelectItem value="12m" className="cursor-pointer">
                Last 12 months
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <div className="px-3 sm:px-6 pb-6">
          <ChartContainer
            config={chartConfig}
            className="h-62.5 sm:h-87.5 w-full"
          >
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-target)"
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-target)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/30"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="target"
                stackId="1"
                stroke="var(--color-target)"
                fill="url(#colorTarget)"
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="2"
                stroke="var(--color-sales)"
                fill="url(#colorSales)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

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
import { usePaymentDashboardSearchParams } from "@/hooks/search-params";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download } from "lucide-react";
import { useCallback } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const paymentData = [
  { date: "Jan 01", volume: 142500, transactions: 1245 },
  { date: "Jan 08", volume: 168200, transactions: 1482 },
  { date: "Jan 15", volume: 156800, transactions: 1356 },
  { date: "Jan 22", volume: 184300, transactions: 1623 },
  { date: "Jan 29", volume: 172100, transactions: 1498 },
  { date: "Feb 05", volume: 198400, transactions: 1745 },
  { date: "Feb 12", volume: 215600, transactions: 1892 },
  { date: "Feb 19", volume: 203200, transactions: 1789 },
  { date: "Feb 26", volume: 228900, transactions: 2012 },
  { date: "Mar 04", volume: 241500, transactions: 2134 },
  { date: "Mar 11", volume: 256800, transactions: 2267 },
  { date: "Mar 18", volume: 268400, transactions: 2389 },
  { date: "Mar 25", volume: 284100, transactions: 2512 },
  { date: "Apr 01", volume: 298700, transactions: 2645 },
  { date: "Apr 08", volume: 312400, transactions: 2789 },
  { date: "Apr 15", volume: 328900, transactions: 2912 },
];

const chartConfig = {
  volume: {
    label: "Volume ($)",
    color: "var(--chart-1)",
  },
  transactions: {
    label: "Transactions",
    color: "var(--chart-2)",
  },
};

export function PaymentVolumeChart() {
  const [{ timeRange, metric }, setSearchParams] =
    usePaymentDashboardSearchParams();
  const setTimeRange = useCallback(
    (value: string) =>
      setSearchParams({ timeRange: value === "3m" ? null : value }),
    [setSearchParams],
  );
  const setMetric = useCallback(
    (value: string) =>
      setSearchParams({ metric: value === "volume" ? null : value }),
    [setSearchParams],
  );
  const isMobile = useIsMobile();

  return (
    <Card className="h-full border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden min-w-0">
      <CardHeader className="flex flex-col space-y-4 pb-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <CardTitle>Payment Volume</CardTitle>
          <CardDescription>
            {metric === "volume"
              ? "Total payment volume over time"
              : "Number of transactions processed"}
          </CardDescription>
        </div>
        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-full cursor-pointer sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume" className="cursor-pointer">
                Volume ($)
              </SelectItem>
              <SelectItem value="transactions" className="cursor-pointer">
                Transactions
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full cursor-pointer sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m" className="cursor-pointer">
                Last month
              </SelectItem>
              <SelectItem value="3m" className="cursor-pointer">
                Last 3 months
              </SelectItem>
              <SelectItem value="6m" className="cursor-pointer">
                Last 6 months
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="cursor-pointer sm:size-9 sm:p-0">
            <Download className="size-4 sm:mr-0 mr-2" />
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="px-3 pb-4 sm:px-6 sm:pb-6">
          <ChartContainer
            config={chartConfig}
            className="h-[220px] w-full sm:h-[320px]"
          >
            <AreaChart
              data={paymentData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-volume)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-volume)"
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient
                  id="colorTransactions"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-transactions)"
                    stopOpacity={0.12}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-transactions)"
                    stopOpacity={0.12}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/30"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={8}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                width={isMobile ? 35 : 45}
                tickFormatter={(value) =>
                  metric === "volume"
                    ? `$${(value / 1000).toFixed(0)}k`
                    : value.toLocaleString()
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) =>
                      name === "volume"
                        ? `$${Number(value).toLocaleString()}`
                        : value?.toLocaleString()
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={`var(--color-${metric})`}
                fill={`url(#color${metric === "volume" ? "Volume" : "Transactions"})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

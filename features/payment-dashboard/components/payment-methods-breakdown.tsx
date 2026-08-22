"use client";

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
import { useCallback } from "react";
import { Cell, Pie, PieChart } from "recharts";

const paymentMethodsData = [
  { name: "Credit Card", value: 45.2, amount: 382640, color: "var(--chart-1)" },
  { name: "Debit Card", value: 23.8, amount: 201520, color: "var(--chart-2)" },
  {
    name: "Bank Transfer",
    value: 15.4,
    amount: 130380,
    color: "var(--chart-3)",
  },
  {
    name: "Digital Wallet",
    value: 10.2,
    amount: 86360,
    color: "var(--chart-4)",
  },
  {
    name: "Cryptocurrency",
    value: 3.8,
    amount: 32180,
    color: "var(--chart-5)",
  },
  {
    name: "Other",
    value: 1.6,
    amount: 13540,
    color: "var(--muted-foreground)",
  },
];

const chartConfig = {
  value: {
    label: "Percentage",
  },
  creditCard: {
    label: "Credit Card",
    color: "var(--chart-1)",
  },
  debitCard: {
    label: "Debit Card",
    color: "var(--chart-2)",
  },
  bankTransfer: {
    label: "Bank Transfer",
    color: "var(--chart-3)",
  },
  digitalWallet: {
    label: "Digital Wallet",
    color: "var(--chart-4)",
  },
  cryptocurrency: {
    label: "Cryptocurrency",
    color: "var(--chart-5)",
  },
};

export function PaymentMethodsBreakdown() {
  const [{ period }, setSearchParams] = usePaymentDashboardSearchParams();
  const setPeriod = useCallback(
    (value: string) =>
      setSearchParams({ period: value === "month" ? null : value }),
    [setSearchParams],
  );
  const isMobile = useIsMobile();

  const totalAmount = paymentMethodsData.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  return (
    <Card className="h-full border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden min-w-0">
      <CardHeader className="flex flex-col space-y-4 pb-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Breakdown by payment type</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full cursor-pointer sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week" className="cursor-pointer">
              This week
            </SelectItem>
            <SelectItem value="month" className="cursor-pointer">
              This month
            </SelectItem>
            <SelectItem value="year" className="cursor-pointer">
              This year
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center justify-center sm:flex-1">
            <div className="relative shrink-0">
              <ChartContainer
                config={chartConfig}
                className="h-35 w-35 sm:h-45 sm:w-45 mx-auto"
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent formatter={(value) => `${value}%`} />
                    }
                  />
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 35 : 40}
                    outerRadius={isMobile ? 55 : 65}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-base font-bold sm:text-xl">
                  ${(totalAmount / 1000).toFixed(0)}k
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Total
                </p>
              </div>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-2 sm:flex sm:flex-1 sm:flex-col">
            {paymentMethodsData.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: method.color }}
                  />
                  <span className="truncate text-xs font-medium">
                    {method.name}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xs font-semibold">{method.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

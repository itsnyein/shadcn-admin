"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/features/calendar/components/calendar";
import { calendars, eventDates, events } from "@/features/calendar/data";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CalendarDays,
  Calendar as CalendarIcon,
  Clock,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

export default function CalendarPage() {
  const stats = {
    total: events.length,
    meetings: events.filter((e) => e.type === "meeting").length,
    tasks: events.filter((e) => e.type === "task").length,
    calendars: calendars.length,
  };

  const performanceMetrics = [
    {
      title: "Total Events",
      current: stats.total.toString(),
      previous: "10",
      growth: 40.0,
      icon: CalendarDays,
    },
    {
      title: "Meetings",
      current: stats.meetings.toString(),
      previous: "4",
      growth: 25.0,
      icon: Users,
    },
    {
      title: "Tasks",
      current: stats.tasks.toString(),
      previous: "3",
      growth: 66.7,
      icon: Clock,
    },
    {
      title: "Calendars",
      current: stats.calendars.toString(),
      previous: "3",
      growth: 66.7,
      icon: CalendarIcon,
    },
  ];

  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="border">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <metric.icon className="text-muted-foreground size-6" />
                  <Badge
                    variant="outline"
                    className={cn(
                      metric.growth >= 0
                        ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400"
                        : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400",
                    )}
                  >
                    {metric.growth >= 0 ? (
                      <>
                        <TrendingUp className="me-1 size-3" />+{metric.growth}%
                      </>
                    ) : (
                      <>
                        <TrendingDown className="me-1 size-3" />
                        {metric.growth}%
                      </>
                    )}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">
                    {metric.title}
                  </p>
                  <div className="text-2xl font-bold">{metric.current}</div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span>from {metric.previous}</span>
                    <ArrowUpRight className="size-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar Card */}
        <Card className="border overflow-hidden">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              View and manage your calendar events
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar events={events} eventDates={eventDates} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

"use client";

import {
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface CalendarItem {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  type: "personal" | "work" | "shared";
}

interface CalendarGroup {
  name: string;
  items: CalendarItem[];
}

interface CalendarsProps {
  calendars?: {
    name: string;
    items: string[];
  }[];
  onCalendarToggle?: (calendarId: string, visible: boolean) => void;
  onCalendarEdit?: (calendarId: string) => void;
  onCalendarDelete?: (calendarId: string) => void;
  onNewCalendar?: () => void;
}

const enhancedCalendars: CalendarGroup[] = [
  {
    name: "Work",
    items: [
      {
        id: "development",
        name: "Development",
        color: "bg-violet-500",
        visible: true,
        type: "work",
      },
      {
        id: "design",
        name: "Design Reviews",
        color: "bg-pink-500",
        visible: true,
        type: "work",
      },
      {
        id: "releases",
        name: "Releases",
        color: "bg-emerald-500",
        visible: true,
        type: "work",
      },
    ],
  },
  {
    name: "Team",
    items: [
      {
        id: "meetings",
        name: "Team Meetings",
        color: "bg-blue-500",
        visible: true,
        type: "shared",
      },
      {
        id: "standups",
        name: "Standups",
        color: "bg-amber-500",
        visible: true,
        type: "shared",
      },
    ],
  },
  {
    name: "Personal",
    items: [
      {
        id: "personal",
        name: "Personal",
        color: "bg-fuchsia-500",
        visible: true,
        type: "personal",
      },
      {
        id: "reminders",
        name: "Reminders",
        color: "bg-rose-500",
        visible: false,
        type: "personal",
      },
    ],
  },
];

export function Calendars({
  onCalendarToggle,
  onCalendarEdit,
  onCalendarDelete,
  onNewCalendar,
}: CalendarsProps) {
  const [calendarData, setCalendarData] = useState(enhancedCalendars);

  const handleToggleVisibility = (calendarId: string) => {
    setCalendarData((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === calendarId ? { ...item, visible: !item.visible } : item,
        ),
      })),
    );

    const calendar = calendarData
      .flatMap((g) => g.items)
      .find((c) => c.id === calendarId);
    if (calendar) {
      onCalendarToggle?.(calendarId, !calendar.visible);
    }
  };

  return (
    <div className="space-y-4">
      {calendarData.map((calendar, index) => (
        <div key={calendar.name}>
          <Collapsible defaultOpen={index === 0} className="group/collapsible">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 hover:text-accent-foreground rounded-md cursor-pointer">
              <span className="text-sm font-medium">{calendar.name}</span>
              <div className="flex items-center gap-1">
                {index === 0 && (
                  <div
                    className="h-5 w-5 flex items-center justify-center opacity-0 group-hover/collapsible:opacity-100 cursor-pointer hover:bg-accent rounded-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNewCalendar?.();
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </div>
                )}
                <ChevronRight className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-1">
                {calendar.items.map((item) => (
                  <div key={item.id} className="group/calendar-item">
                    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => handleToggleVisibility(item.id)}
                          className={cn(
                            "flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border transition-all cursor-pointer",
                            item.visible
                              ? cn("border-transparent text-white", item.color)
                              : "border-border bg-transparent",
                          )}
                        >
                          {item.visible && <Check className="size-3" />}
                        </button>

                        <span
                          className={cn(
                            "flex-1 truncate text-sm cursor-pointer",
                            !item.visible && "text-muted-foreground",
                          )}
                          onClick={() => handleToggleVisibility(item.id)}
                        >
                          {item.name}
                        </span>

                        <div className="opacity-0 group-hover/calendar-item:opacity-100">
                          {item.visible ? (
                            <Eye className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div
                              className="h-5 w-5 flex items-center justify-center p-0 opacity-0 group-hover/calendar-item:opacity-100 cursor-pointer hover:bg-accent rounded-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" side="right">
                            <DropdownMenuItem
                              onClick={() => onCalendarEdit?.(item.id)}
                              className="cursor-pointer"
                            >
                              Edit calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleVisibility(item.id)}
                              className="cursor-pointer"
                            >
                              {item.visible ? "Hide" : "Show"} calendar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onCalendarDelete?.(item.id)}
                              className="cursor-pointer text-destructive"
                            >
                              Delete calendar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
}

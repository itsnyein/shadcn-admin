import { cn } from "@/lib/utils";
import {
  IconChartBar,
  IconChecklist,
  IconLayoutDashboard,
  IconMessages,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { ChevronRight, Search } from "lucide-react";
import { ReactNode } from "react";

const SIDEBAR_ITEMS = [
  { icon: IconLayoutDashboard, label: "Dashboard", active: true },
  { icon: IconUsers, label: "Users", active: false },
  { icon: IconChecklist, label: "Tasks", active: false },
  { icon: IconMessages, label: "Chats", active: false },
  { icon: IconChartBar, label: "Reports", active: false },
  { icon: IconSettings, label: "Settings", active: false },
];

export function MockDashboardUI({ children }: { children: ReactNode }) {
  return (
    <div className="flex text-sm">
      <aside className="hidden w-52 shrink-0 flex-col border-r border-dashed p-3 md:flex">
        <div className="flex items-center gap-2 px-1 pb-4">
          <span className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md text-[10px] font-bold">
            SA
          </span>
          <span className="text-[13px] font-semibold tracking-tight">
            Shadcn Admin
          </span>
        </div>

        <p className="text-muted-foreground px-1 pb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Workspace
        </p>

        <div className="flex flex-col gap-0.5">
          {SIDEBAR_ITEMS.map((item) => (
            <span
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px]",
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </span>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex h-12 items-center gap-3 border-b border-dashed px-4">
          <span className="text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex">
            Dashboard
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium">Overview</span>
          </span>

          <span className="text-muted-foreground ml-auto flex items-center gap-2 rounded-md border border-dashed px-2 py-1 text-[11px]">
            <Search className="size-3" />
            <span className="hidden sm:inline">Search…</span>
            <kbd className="bg-muted rounded px-1 font-mono text-[10px]">
              ⌘K
            </kbd>
          </span>

          <span className="bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-full text-[10px] font-medium">
            NP
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}

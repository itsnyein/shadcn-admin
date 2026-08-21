import type { ActivityItem } from "@/features/landing/data";

export function ActivityCard({ icon: Icon, title, meta, time }: ActivityItem) {
  return (
    <div className="bg-background flex items-start gap-2.5 rounded-md border p-2.5">
      <span className="bg-primary/10 text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md">
        <Icon className="size-3.5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[13px] font-medium">{title}</p>
          <span className="text-muted-foreground shrink-0 font-mono text-[10px] tabular-nums">
            {time}
          </span>
        </div>
        <p className="text-muted-foreground truncate text-[11px]">{meta}</p>
      </div>
    </div>
  );
}

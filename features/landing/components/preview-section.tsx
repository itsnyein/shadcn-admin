import { AnimatedList } from "@/components/shared/animated-list";
import { ACTIVITY_FEED, DEMO_ROWS, STAT_CARDS } from "@/features/landing/data";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ActivityCard } from "./activity-card";
import { MockDashboardUI } from "./mock-dashboard-ui";
import { Section } from "./landing-shell";

export function PreviewSection() {
  return (
    <Section innerClassName="p-0">
      <MockDashboardUI>
        <div className="grid gap-0 xl:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <div className="grid grid-cols-2 border-b border-dashed lg:grid-cols-4">
              {STAT_CARDS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "p-4",
                    i % 2 === 0 && "border-r border-dashed lg:border-r",
                    i < 2 && "border-b border-dashed lg:border-b-0",
                    i === 2 && "lg:border-r lg:border-dashed",
                  )}
                >
                  <p className="text-muted-foreground truncate font-mono text-[10px] tracking-[0.14em] uppercase">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </p>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-xs font-medium",
                        stat.up ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {stat.up ? (
                        <ArrowUpRight className="size-3" />
                      ) : (
                        <ArrowDownRight className="size-3" />
                      )}
                      {stat.delta}
                    </span>

                    <span className="flex h-6 items-end gap-0.5">
                      {stat.spark.map((h, j) => (
                        <span
                          key={j}
                          style={{ height: `${h}%` }}
                          className={cn(
                            "w-1 rounded-sm",
                            j === stat.spark.length - 1
                              ? "bg-primary"
                              : "bg-muted-foreground/30",
                          )}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between pb-3">
                <p className="text-[13px] font-semibold tracking-tight">
                  Team members
                </p>
                <span className="text-muted-foreground font-mono text-[10px]">
                  4 of 128
                </span>
              </div>

              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-muted-foreground border-y border-dashed font-mono text-[10px] tracking-[0.14em] uppercase">
                    <th className="py-2 font-normal">Member</th>
                    <th className="hidden py-2 font-normal sm:table-cell">
                      Role
                    </th>
                    <th className="py-2 text-right font-normal">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {DEMO_ROWS.map((row) => (
                    <tr key={row.email} className="border-b border-dashed">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="bg-muted text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
                            {row.initials}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium">
                              {row.name}
                            </span>
                            <span className="text-muted-foreground block truncate text-[11px]">
                              {row.email}
                            </span>
                          </span>
                        </div>
                      </td>

                      <td className="text-muted-foreground hidden py-2.5 text-xs sm:table-cell">
                        {row.role}
                      </td>

                      <td className="py-2.5 text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]",
                            row.status === "Active"
                              ? "text-foreground"
                              : "text-muted-foreground border-dashed",
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              row.status === "Active"
                                ? "bg-primary"
                                : "bg-muted-foreground/50",
                            )}
                          />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-dashed p-4 xl:border-t-0 xl:border-l">
            <div className="flex items-center gap-2 pb-3">
              <span className="relative flex size-1.5">
                <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-primary relative inline-flex size-1.5 rounded-full" />
              </span>
              <span className="text-muted-foreground font-mono text-[10px] tracking-[0.14em] uppercase">
                Live activity
              </span>
            </div>

            <AnimatedList className="gap-2.5">
              {ACTIVITY_FEED.map((item) => (
                <ActivityCard key={item.title} {...item} />
              ))}
            </AnimatedList>
          </div>
        </div>
      </MockDashboardUI>
    </Section>
  );
}

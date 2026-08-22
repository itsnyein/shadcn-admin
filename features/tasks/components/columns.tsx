"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import type { Task } from "../schema";
import { labels, priorities, statuses } from "../data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => (
      <div className="w-22.5 font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-2">
          {label && (
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 text-xs font-medium",
                label.value === "bug" &&
                  "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400",
                label.value === "feature" &&
                  "border-primary/50 bg-primary/10 text-primary",
              )}
            >
              {label.label}
            </Badge>
          )}
          <span className="max-w-100 truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <Badge
          variant="outline"
          className={cn(
            "flex w-fit items-center gap-1.5 font-medium",
            status.value === "done" &&
              "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            status.value === "in progress" &&
              "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400",
            status.value === "todo" &&
              "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400",
            status.value === "backlog" &&
              "border-slate-500/50 bg-slate-500/10 text-slate-600 dark:text-slate-400",
            status.value === "canceled" &&
              "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400",
          )}
        >
          {status.icon && <status.icon className="size-3.5" />}
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div
          className={cn(
            "flex items-center gap-1.5 font-medium",
            priority.value === "high" && "text-red-600 dark:text-red-400",
            priority.value === "medium" && "text-amber-600 dark:text-amber-400",
            priority.value === "low" && "text-slate-600 dark:text-slate-400",
          )}
        >
          {priority.icon && <priority.icon className="size-4" />}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

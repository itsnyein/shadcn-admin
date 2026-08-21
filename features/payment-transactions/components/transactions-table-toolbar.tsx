"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { exportToCSV, exportToJSON } from "@/lib/export-data";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import type { Table } from "@tanstack/react-table";
import { Download, PlusCircle, Search, X } from "lucide-react";
import { useCallback, useRef } from "react";
import { gateways, paymentMethods, transactionStatuses } from "../data";
import { TransactionsViewOptions } from "./transactions-view-options";

interface TransactionsTableToolbarProps<TData> {
  table: Table<TData>;
}

interface FilterOption {
  label: string;
  value: string;
  color?: string;
}

interface FacetedFilterProps<TData> {
  table: Table<TData>;
  columnId: string;
  title: string;
  options: FilterOption[];
}

function FacetedFilter<TData>({
  table,
  columnId,
  title,
  options,
}: FacetedFilterProps<TData>) {
  const column = table.getColumn(columnId);
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 cursor-pointer border-dashed"
        >
          <PlusCircle className="size-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="cursor-pointer rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                    className="cursor-pointer"
                  >
                    <Checkbox checked={isSelected} className="mr-2" />
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="cursor-pointer justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function TransactionsTableToolbar<TData>({
  table,
}: TransactionsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const filterValue =
    (table.getColumn("customer")?.getFilterValue() as string) ?? "";

  const [searchValue, handleSearchChange] = useDebouncedCallback(
    filterValue,
    (value) => table.getColumn("customer")?.setFilterValue(value || undefined),
  );

  const searchRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts({
    onFocusSearch: useCallback(() => searchRef.current?.focus(), []),
    onClearFilters: useCallback(() => table.resetColumnFilters(), [table]),
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            placeholder="Search transactions... ( / )"
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="h-8 w-50 pl-8 lg:w-70"
          />
        </div>
        <FacetedFilter
          table={table}
          columnId="status"
          title="Status"
          options={transactionStatuses}
        />
        <FacetedFilter
          table={table}
          columnId="method"
          title="Method"
          options={paymentMethods}
        />
        <FacetedFilter
          table={table}
          columnId="gateway"
          title="Gateway"
          options={gateways}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 cursor-pointer px-3"
          >
            Reset
            <X className="ml-1 size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <TransactionsViewOptions table={table} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 cursor-pointer">
              <Download className="size-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                const rows = table
                  .getFilteredRowModel()
                  .rows.map((row) => row.original as Record<string, unknown>);
                const cols = [
                  { key: "reference", label: "Reference" },
                  { key: "customer", label: "Customer" },
                  { key: "amount", label: "Amount" },
                  { key: "currency", label: "Currency" },
                  { key: "status", label: "Status" },
                  { key: "method", label: "Method" },
                  { key: "gateway", label: "Gateway" },
                  { key: "fee", label: "Fee" },
                  { key: "net", label: "Net" },
                  { key: "country", label: "Country" },
                  { key: "createdAt", label: "Date" },
                ] as const;
                exportToCSV(rows, "transactions", [...cols]);
              }}
            >
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                const rows = table
                  .getFilteredRowModel()
                  .rows.map((row) => row.original as Record<string, unknown>);
                const cols = [
                  { key: "reference", label: "Reference" },
                  { key: "customer", label: "Customer" },
                  { key: "amount", label: "Amount" },
                  { key: "currency", label: "Currency" },
                  { key: "status", label: "Status" },
                  { key: "method", label: "Method" },
                  { key: "gateway", label: "Gateway" },
                  { key: "fee", label: "Fee" },
                  { key: "net", label: "Net" },
                  { key: "country", label: "Country" },
                  { key: "createdAt", label: "Date" },
                ] as const;
                exportToJSON(rows, "transactions", [...cols]);
              }}
            >
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

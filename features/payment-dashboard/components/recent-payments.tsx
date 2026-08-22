"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Building2,
  Copy,
  CreditCard,
  Eye,
  MoreHorizontal,
  RefreshCcw,
  Smartphone,
  Wallet,
} from "lucide-react";

type PaymentStatus =
  | "completed"
  | "pending"
  | "processing"
  | "failed"
  | "refunded";
type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "bank_transfer"
  | "digital_wallet"
  | "crypto";

interface Payment {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: string;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  date: string;
  reference: string;
}

const payments: Payment[] = [
  {
    id: "PAY-2024-001",
    customer: {
      name: "Emma Thompson",
      email: "emma.t@company.io",
      avatar: "https://github.com/shadcn.png",
    },
    amount: "4,299.00",
    currency: "USD",
    status: "completed",
    method: "credit_card",
    date: "2 min ago",
    reference: "INV-2024-0892",
  },
  {
    id: "PAY-2024-002",
    customer: {
      name: "Marcus Chen",
      email: "m.chen@enterprise.com",
      avatar: "https://github.com/leerob.png",
    },
    amount: "12,850.00",
    currency: "USD",
    status: "processing",
    method: "bank_transfer",
    date: "15 min ago",
    reference: "INV-2024-0891",
  },
  {
    id: "PAY-2024-003",
    customer: {
      name: "Sarah Williams",
      email: "sarah.w@startup.io",
      avatar: "https://github.com/evilrabbit.png",
    },
    amount: "890.50",
    currency: "USD",
    status: "completed",
    method: "digital_wallet",
    date: "1 hour ago",
    reference: "INV-2024-0890",
  },
  {
    id: "PAY-2024-004",
    customer: {
      name: "James Rodriguez",
      email: "j.rodriguez@corp.net",
      avatar: "https://github.com/rauchg.png",
    },
    amount: "2,340.00",
    currency: "USD",
    status: "pending",
    method: "debit_card",
    date: "2 hours ago",
    reference: "INV-2024-0889",
  },
  {
    id: "PAY-2024-005",
    customer: {
      name: "Lisa Park",
      email: "lisa.park@tech.co",
      avatar: "https://github.com/timneutkens.png",
    },
    amount: "5,670.00",
    currency: "USD",
    status: "failed",
    method: "credit_card",
    date: "3 hours ago",
    reference: "INV-2024-0888",
  },
  {
    id: "PAY-2024-006",
    customer: {
      name: "David Kim",
      email: "d.kim@solutions.io",
      avatar: "https://github.com/shuding.png",
    },
    amount: "1,299.00",
    currency: "USD",
    status: "refunded",
    method: "credit_card",
    date: "5 hours ago",
    reference: "INV-2024-0887",
  },
];

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  }
> = {
  completed: {
    label: "Completed",
    variant: "default",
    className:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20",
  },
  pending: {
    label: "Pending",
    variant: "secondary",
    className:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  processing: {
    label: "Processing",
    variant: "secondary",
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  failed: {
    label: "Failed",
    variant: "destructive",
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  refunded: {
    label: "Refunded",
    variant: "outline",
    className:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
};

const methodIcons: Record<PaymentMethod, React.ReactNode> = {
  credit_card: <CreditCard className="size-4" />,
  debit_card: <CreditCard className="size-4" />,
  bank_transfer: <Building2 className="size-4" />,
  digital_wallet: <Wallet className="size-4" />,
  crypto: <Smartphone className="size-4" />,
};

export function RecentPayments() {
  return (
    <Card className="h-full border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden min-w-0">
      <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Latest payment transactions</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer sm:w-auto"
        >
          <ArrowUpRight className="size-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        {payments.map((payment) => {
          const status = statusConfig[payment.status];
          return (
            <div
              key={payment.id}
              className="flex items-center gap-2 rounded-lg border p-2 transition-colors hover:bg-muted/50 sm:gap-3 sm:p-3"
            >
              <Avatar className="size-8 shrink-0 sm:size-10">
                <AvatarImage
                  src={payment.customer.avatar}
                  alt={payment.customer.name}
                />
                <AvatarFallback className="bg-primary/10 text-xs text-primary sm:text-sm">
                  {payment.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <p className="truncate text-xs font-medium sm:text-sm">
                    {payment.customer.name}
                  </p>
                  <div className="hidden text-muted-foreground sm:block">
                    {methodIcons[payment.method]}
                  </div>
                </div>
                <p className="hidden truncate text-xs text-muted-foreground sm:block">
                  {payment.customer.email}
                </p>
                <p className="truncate text-[10px] text-muted-foreground/70 sm:text-xs">
                  {payment.reference}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-0.5 sm:gap-1">
                <p className="text-xs font-semibold sm:text-sm">
                  ${payment.amount}
                </p>
                <Badge
                  variant={status.variant}
                  className={cn(
                    "cursor-default text-[10px] sm:text-xs",
                    status.className,
                  )}
                >
                  {status.label}
                </Badge>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  {payment.date}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-7 shrink-0 cursor-pointer p-0 sm:size-8"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Eye className="mr-2 size-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Copy className="mr-2 size-4" />
                    Copy Reference
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <RefreshCcw className="mr-2 size-4" />
                    Process Refund
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

import {
  IconBrain,
  IconChartBar,
  IconCreditCard,
  IconLayoutDashboard,
  IconLock,
  IconTable,
} from "@tabler/icons-react";
import {
  AlertTriangle,
  CreditCard,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

export type ActivityItem = {
  icon: LucideIcon;
  title: string;
  meta: string;
  time: string;
};

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    icon: UserPlus,
    title: "New user signed up",
    meta: "nyein@shadcn-admin.dev",
    time: "12:45",
  },
  {
    icon: CreditCard,
    title: "Payment received",
    meta: "$149.00 · Pro plan",
    time: "01:00",
  },
  {
    icon: TrendingUp,
    title: "Revenue milestone",
    meta: "$5,000 MRR · +8.2%",
    time: "05:11",
  },
  {
    icon: AlertTriangle,
    title: "Seat limit reached",
    meta: "100 / 100 seats used",
    time: "06:30",
  },
];

export const HERO_TRUST = [
  "MIT licensed",
  "Next.js 16 · React 19",
  "20+ working pages",
];

export const HERO_SPECS = [
  { label: "Pages", value: "20+" },
  { label: "UI components", value: "40+" },
  { label: "Framework", value: "Next.js 16" },
  { label: "Styling", value: "Tailwind v4" },
  { label: "Auth", value: "Better Auth" },
  { label: "Database", value: "Drizzle + Postgres" },
  { label: "License", value: "MIT" },
];

export const STAT_CARDS = [
  {
    label: "Total revenue",
    value: "$45,231",
    delta: "+20.1%",
    up: true,
    spark: [30, 45, 38, 62, 55, 78, 70, 92],
  },
  {
    label: "Subscriptions",
    value: "2,350",
    delta: "+18.2%",
    up: true,
    spark: [40, 35, 52, 48, 66, 60, 80, 88],
  },
  {
    label: "Active now",
    value: "573",
    delta: "-4.5%",
    up: false,
    spark: [80, 72, 84, 66, 70, 55, 60, 48],
  },
  {
    label: "Churn rate",
    value: "1.2%",
    delta: "-0.4%",
    up: true,
    spark: [70, 62, 66, 50, 45, 38, 34, 28],
  },
];

export const DEMO_ROWS = [
  {
    initials: "NP",
    name: "Nyein Phyo",
    email: "nyein@shadcn-admin.dev",
    role: "Owner",
    status: "Active",
  },
  {
    initials: "AK",
    name: "Aiko Kimura",
    email: "aiko@shadcn-admin.dev",
    role: "Admin",
    status: "Active",
  },
  {
    initials: "MR",
    name: "Marco Rossi",
    email: "marco@shadcn-admin.dev",
    role: "Editor",
    status: "Invited",
  },
  {
    initials: "SD",
    name: "Sara Diallo",
    email: "sara@shadcn-admin.dev",
    role: "Viewer",
    status: "Active",
  },
];

export const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Better Auth",
  "Drizzle ORM",
  "Neon Postgres",
  "TanStack Table",
  "Recharts",
  "AI SDK",
  "nuqs",
  "Zustand",
  "Zod",
  "React Hook Form",
  "Motion",
  "dnd-kit",
];

export const THEME_TOKENS = [
  { key: "--background", value: "oklch(1 0 0)" },
  { key: "--foreground", value: "oklch(0.145 0 0)" },
  { key: "--radius", value: "0.625rem" },
  { key: "--font-sans", value: '"Inter"' },
];

export const FEATURE_CARDS = [
  {
    icon: IconTable,
    title: "Data tables that work",
    description:
      "TanStack Table with sorting, faceted filters, row selection, pagination and CSV export - URL-synced through nuqs so state survives a refresh.",
  },
  {
    icon: IconLock,
    title: "Auth, wired end to end",
    description:
      "Better Auth with email and social sign-in, session helpers and a proxy that guards every dashboard route.",
  },
  {
    icon: IconBrain,
    title: "Streaming AI chat",
    description:
      "A working assistant built on the Vercel AI SDK with streamed responses, markdown rendering and token accounting.",
  },
  {
    icon: IconChartBar,
    title: "Charts and reporting",
    description:
      "Recharts area, bar and radial charts sharing one themed config, so every graph matches your palette automatically.",
  },
  {
    icon: IconCreditCard,
    title: "Billing screens",
    description:
      "Payment dashboards, transaction tables and three pricing layouts ready for the provider of your choice.",
  },
  {
    icon: IconLayoutDashboard,
    title: "Boards and calendars",
    description:
      "Drag-and-drop kanban on dnd-kit plus a full calendar with event mutations already implemented.",
  },
];

export const PAGE_GROUPS = [
  {
    title: "Core",
    pages: [
      {
        name: "Two dashboards",
        meta: "Analytics overview and a denser variant",
      },
      { name: "Users", meta: "Table, filters, invite and edit dialogs" },
      { name: "Tasks", meta: "Data table with bulk actions and CSV export" },
      { name: "Kanban", meta: "Drag-and-drop columns on dnd-kit" },
    ],
  },
  {
    title: "Communication",
    pages: [
      { name: "Mail", meta: "Resizable three-pane inbox" },
      { name: "Chats", meta: "Conversation list with message threads" },
      { name: "AI chat", meta: "Streaming assistant on the AI SDK" },
      { name: "Calendar", meta: "Month view with event mutations" },
    ],
  },
  {
    title: "Account & system",
    pages: [
      { name: "Settings", meta: "Profile, account, appearance, notifications" },
      { name: "Billing", meta: "Payment dashboard and transactions" },
      { name: "Auth flows", meta: "Sign in, sign up and password reset" },
      { name: "Error states", meta: "401, 403, 404, 500 and maintenance" },
    ],
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Clone and install",
    description:
      "Pull the repo and install with pnpm. No paid dependencies, no license key, no account to create.",
    command: "pnpm install",
  },
  {
    step: "02",
    title: "Point it at your data",
    description:
      "Drop your Postgres URL into .env and push the Drizzle schema. Auth tables and the seed user come with it.",
    command: "pnpm db:push && pnpm db:seed",
  },
  {
    step: "03",
    title: "Make it yours",
    description:
      "Delete the pages you do not need, set your tokens in globals.css, and start building the screens only you have.",
    command: "pnpm dev",
  },
];

export const FOOTER_LINKS = [
  { label: "Live demo", href: "/dashboard" },
  { label: "Features", href: "#features" },
  { label: "Pages", href: "#pages" },
  { label: "Workflow", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
  { label: "Sign in", href: "/sign-in" },
];

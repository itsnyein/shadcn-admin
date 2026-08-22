"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  CreditCard,
  KeyRound,
  MessageSquare,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "New to the platform? Start here",
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-border",
    articleCount: 12,
  },
  {
    title: "Account & Settings",
    description: "Manage your account and preferences",
    icon: Settings,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    articleCount: 8,
  },
  {
    title: "Billing & Payments",
    description: "Questions about billing and subscriptions",
    icon: CreditCard,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    articleCount: 15,
  },
  {
    title: "Security & Privacy",
    description: "Keep your account secure",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    articleCount: 10,
  },
  {
    title: "API & Integrations",
    description: "Developer resources and API docs",
    icon: KeyRound,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    articleCount: 20,
  },
  {
    title: "Team & Collaboration",
    description: "Working with teams and members",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    articleCount: 14,
  },
  {
    title: "Guides & Tutorials",
    description: "Step-by-step guides and tutorials",
    icon: BookOpen,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    articleCount: 18,
  },
  {
    title: "Support & Contact",
    description: "Get in touch with our support team",
    icon: MessageSquare,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    articleCount: 5,
  },
];

export function CategoryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Card
            key={category.title}
            className="group h-full border transition-all hover:shadow-md"
          >
            <CardContent className="flex flex-col gap-4 p-6">
              <div
                className={`flex size-12 items-center justify-center rounded-lg ${category.bgColor} ${category.borderColor} border transition-transform group-hover:scale-110`}
              >
                <Icon className={`size-6 ${category.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold leading-tight">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </div>
              <div className="mt-auto">
                <Badge variant="outline" className="text-xs">
                  {category.articleCount} articles
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

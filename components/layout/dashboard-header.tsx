"use client";

import {
  CommandSearch,
  SearchTrigger,
} from "@/components/layout/command-search";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { ThemeCustomizer } from "@/components/shared/theme-customizer";
import { ToggleTheme } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

export function DashboardHeader() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false);
  const [commandSearchOpen, setCommandSearchOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    const authParam = searchParams.get("auth");
    if (authParam === "success") {
      toast.success("Signed in successfully!", {
        description: "Welcome back to your dashboard.",
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("auth");
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [mounted, searchParams, router]);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
        <div className="ml-auto flex items-center gap-1">
          <Separator
            orientation="vertical"
            className="mx-2 h-6! bg-border/50"
          />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
      <Separator orientation="vertical" className="mx-2 h-6! bg-border/50" />
      <SearchTrigger onClick={() => setCommandSearchOpen(true)} />
      <CommandSearch
        open={commandSearchOpen}
        onOpenChange={setCommandSearchOpen}
      />
      <div className="ml-auto flex items-center gap-1">
        <ToggleTheme />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setThemeCustomizerOpen(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open theme customizer</span>
        </Button>

        <ThemeCustomizer
          open={themeCustomizerOpen}
          onOpenChange={setThemeCustomizerOpen}
        />

        <Separator orientation="vertical" className="mx-2 h-6! bg-border/50" />

        <ProfileDropdown />
      </div>
    </header>
  );
}

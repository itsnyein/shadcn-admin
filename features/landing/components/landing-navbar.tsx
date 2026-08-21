import { buttonVariants } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/session";
import { ArrowRight, Command } from "lucide-react";
import Link from "next/link";
import { GithubStars } from "./github-stars";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pages", href: "#pages" },
  { label: "Workflow", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
];

export async function LandingNavbar() {
  const authenticated = await isAuthenticated();

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b border-dashed backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <Command className="size-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Shadcn Admin
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <GithubStars className="hidden sm:inline-flex" />

          {authenticated ? (
            <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
              Dashboard <ArrowRight className="size-4" />
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "hidden sm:inline-flex",
                })}
              >
                Sign in
              </Link>

              <Link
                href="/dashboard"
                className={buttonVariants({ size: "sm" })}
              >
                Live demo <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

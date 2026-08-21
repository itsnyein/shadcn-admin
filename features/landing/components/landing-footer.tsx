import { FOOTER_LINKS } from "@/features/landing/data";
import { GITHUB_OWNER, GITHUB_URL } from "@/lib/github";
import { IconBrandGithub } from "@tabler/icons-react";
import { Command } from "lucide-react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
              <Command className="size-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Shadcn Admin
            </span>
          </Link>

          <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
            A free, open-source admin dashboard starter built with Next.js,
            Tailwind CSS and shadcn/ui. MIT licensed and maintained by{" "}
            <Link
              href={`https://github.com/${GITHUB_OWNER}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground underline underline-offset-4"
            >
              {GITHUB_OWNER}
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
          >
            <IconBrandGithub className="size-4" />
            Star the repo
          </Link>
        </div>
      </div>

      <p className="text-muted-foreground mt-10 border-t border-dashed pt-6 text-xs">
        © {new Date().getFullYear()} Shadcn Admin. MIT licensed.
      </p>
    </footer>
  );
}

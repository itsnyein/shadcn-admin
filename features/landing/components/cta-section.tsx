import { buttonVariants } from "@/components/ui/button";
import { GITHUB_OWNER, GITHUB_REPO, GITHUB_URL } from "@/lib/github";
import { IconBrandGithub } from "@tabler/icons-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "./copy-command";
import { Section } from "./landing-shell";

export function CtaSection() {
  return (
    <Section innerClassName="px-5 py-24 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Clone it. Strip it. Ship it.
        </h2>

        <p className="text-muted-foreground mt-5 text-base leading-relaxed text-pretty">
          Your next internal tool, SaaS console or admin panel starts from
          working code instead of an empty{" "}
          <code className="font-mono text-sm">app/</code> directory.
        </p>

        <div className="mt-8">
          <CopyCommand
            command={`git clone https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}.git`}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className={buttonVariants({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            Explore the live demo
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "w-full sm:w-auto",
            })}
          >
            <IconBrandGithub className="size-4" />
            View on GitHub
          </Link>
        </div>
      </div>
    </Section>
  );
}

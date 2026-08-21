import { buttonVariants } from "@/components/ui/button";
import { HERO_SPECS, HERO_TRUST } from "@/features/landing/data";
import { GITHUB_URL, formatStars, getRepoStars } from "@/lib/github";
import { IconBrandGithub } from "@tabler/icons-react";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Section } from "./landing-shell";

export async function HeroSection() {
  const stars = await getRepoStars();

  return (
    <Section innerClassName="grid gap-14 px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:grid-cols-[1fr_16rem] lg:gap-16">
      <div className="max-w-2xl">
        <span className="text-muted-foreground inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1 font-mono text-xs">
          <span className="bg-primary size-1.5 rounded-full" />
          MIT · free forever
        </span>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          The admin dashboard that is{" "}
          <span className="from-chart-1 via-chart-4 to-chart-1 bg-linear-to-r bg-clip-text text-transparent">
            already finished
          </span>
        </h1>

        <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed text-pretty">
          Twenty-plus working screens - tables, kanban, mail, calendar, AI chat
          - on Next.js 16, React 19 and Tailwind v4. Wired to real auth and a
          real database, not static mockups.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
            Star on GitHub
            {stars !== null ? (
              <>
                <span aria-hidden className="bg-border ml-1 h-4 w-px" />
                <span className="flex items-center gap-1 tabular-nums">
                  <Star className="size-3.5" />
                  {formatStars(stars)}
                </span>
              </>
            ) : null}
          </Link>
        </div>

        <ul className="text-muted-foreground mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
          {HERO_TRUST.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden className="bg-border h-px w-4" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <dl className="divide-y divide-dashed self-start border-y border-dashed font-mono text-xs lg:mt-2">
        {HERO_SPECS.map((spec) => (
          <div
            key={spec.label}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <dt className="text-muted-foreground">{spec.label}</dt>
            <dd className="text-right">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

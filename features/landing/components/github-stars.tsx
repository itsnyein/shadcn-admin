import { cn } from "@/lib/utils";
import { GITHUB_URL, formatStars, getRepoStars } from "@/lib/github";
import { IconBrandGithub } from "@tabler/icons-react";
import { Star } from "lucide-react";
import Link from "next/link";

export async function GithubStars({ className }: { className?: string }) {
  const stars = await getRepoStars();

  return (
    <Link
      href={GITHUB_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={
        stars === null
          ? "View this project on GitHub"
          : `Star this project on GitHub - ${stars} ${stars === 1 ? "star" : "stars"}`
      }
      className={cn(
        "group bg-background/60 hover:border-foreground/25 hover:bg-accent/40 inline-flex items-center rounded-full border text-sm font-medium transition-colors",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 py-1.5 pr-2.5 pl-3">
        <IconBrandGithub className="size-4" />
        <span className="hidden sm:inline">GitHub</span>
      </span>

      {stars !== null ? (
        <>
          <span aria-hidden className="bg-border h-4 w-px" />
          <span className="flex items-center gap-1 py-1.5 pr-3 pl-2.5 tabular-nums">
            <Star className="size-3.5 transition-transform duration-300 group-hover:scale-115" />
            {formatStars(stars)}
          </span>
        </>
      ) : null}
    </Link>
  );
}

import { cache } from "react";

export const GITHUB_OWNER = "Its-Nyein";
export const GITHUB_REPO = "shadcn-admin";
export const GITHUB_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

export const getRepoStars = cache(async (): Promise<number | null> => {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as { stargazers_count?: unknown };

    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
});

export function formatStars(count: number): string {
  if (count < 1000) return String(count);

  const thousands = count / 1000;
  const rounded = thousands < 10 ? thousands.toFixed(1) : Math.round(thousands);

  return `${String(rounded).replace(/\.0$/, "")}k`;
}

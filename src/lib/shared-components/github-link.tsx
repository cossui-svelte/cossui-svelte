import { Button } from "@coss/ui/components/button";
import { Skeleton } from "@coss/ui/components/skeleton";
import { siteConfig } from "@coss/ui/lib/config";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import * as React from "react";

export function GitHubLink() {
  return (
    <Button
      className="relative h-8 shadow-none max-sm:w-8"
      render={
        <Link href={siteConfig.links.github} rel="noreferrer" target="_blank">
          <HugeiconsIcon className="size-4" icon={GithubIcon} strokeWidth={2} />
          <span className="max-sm:sr-only">
            <React.Suspense fallback={<Skeleton className="h-4 w-[25.5px]" />}>
              <StarsCount />
            </React.Suspense>
          </span>
        </Link>
      }
      size="sm"
      variant="ghost"
    />
  );
}

export async function StarsCount() {
  try {
    const data = await fetch("https://api.github.com/repos/cosscom/coss", {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    });

    if (!data.ok) {
      throw new Error(`GitHub API error: ${data.status}`);
    }

    const json = await data.json();
    const starsCount = json.stargazers_count;

    if (typeof starsCount !== "number" || starsCount < 0) {
      throw new Error("Invalid stars count");
    }

    return (
      <span className="w-8 text-muted-foreground text-xs tabular-nums">
        {starsCount >= 1000
          ? `${(starsCount / 1000).toFixed(1)}k`
          : starsCount.toLocaleString()}
      </span>
    );
  } catch {
    // Return nothing when GitHub API is unavailable or repo doesn't exist
    return null;
  }
}

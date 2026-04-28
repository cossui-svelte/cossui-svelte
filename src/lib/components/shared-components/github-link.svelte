<script lang="ts">
  import { Github } from "lucide-svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { buttonVariants } from "$lib/components/ui/button";
  import { cn } from "$lib/utils.js";

  const githubRepo = "cosscom/coss";
  const githubUrl = `https://github.com/${githubRepo}`;

  async function fetchStarsCount(): Promise<string | null> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${githubRepo}`,
      );
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const json = await response.json();
      const starsCount: unknown = json.stargazers_count;
      if (typeof starsCount !== "number" || starsCount < 0) {
        throw new Error("Invalid stars count");
      }
      return starsCount >= 1000
        ? `${(starsCount / 1000).toFixed(1)}k`
        : starsCount.toLocaleString();
    } catch {
      return null;
    }
  }

  const starsPromise = fetchStarsCount();
</script>

<a
  class={cn(
    buttonVariants({ size: "sm", variant: "ghost" }),
    "relative h-8 shadow-none max-sm:w-8",
  )}
  href={githubUrl}
  rel="noreferrer"
  target="_blank"
>
  <Github class="size-4" strokeWidth={2} />
  <span class="max-sm:sr-only">
    {#await starsPromise}
      <Skeleton class="h-4 w-[25.5px]" />
    {:then stars}
      {#if stars}
        <span class="w-8 text-muted-foreground text-xs tabular-nums"
          >{stars}</span
        >
      {/if}
    {:catch}
      <!-- GitHub API unavailable -->
    {/await}
  </span>
</a>

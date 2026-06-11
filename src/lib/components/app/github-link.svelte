<script lang="ts">
  import { Button } from "../ui/button";
  import GithubIcon from "svelte-remixicon/RiGithubFill.svelte";
  import { onMount } from "svelte";

  export const FALLBACK_STAR_COUNT = 8000;

  async function getGithubStarCount() {
    try {
      const res = await fetch("https://ungh.cc/repos/orefalo/cossui-svelte");
      const data = await res.json();
      return data.repo?.stars ?? FALLBACK_STAR_COUNT;
    } catch (error) {
      console.error(error);
      return FALLBACK_STAR_COUNT;
    }
  }

  let stars = $state(FALLBACK_STAR_COUNT);

  onMount(async () => {
    stars = await getGithubStarCount();
  });
</script>

<Button
  href="https://github.com/orefalo/cossui-svelte"
  target="_blank"
  rel="noreferrer"
  size="sm"
  variant="ghost"
  class="h-8 shadow-none"
>
  <GithubIcon />
  <span class="text-muted-foreground w-8 text-xs tabular-nums">
    {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
  </span>
</Button>

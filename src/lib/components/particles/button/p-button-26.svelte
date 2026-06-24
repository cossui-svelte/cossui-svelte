<script lang="ts">
  import Star from "@lucide/svelte/icons/star";
  import { Button } from "$lib/components/ui/button";

  let isStarred = $state(false);
  let count = $derived(isStarred ? 730 : 729);
</script>

<Button onclick={() => (isStarred = !isStarred)}>
  <Star
    aria-hidden="true"
    class={isStarred ? "fill-yellow-500 text-yellow-500" : ""}
  />
  <span class="flex items-baseline gap-2">
    {isStarred ? "Starred" : "Star"}
    <span class="text-primary-foreground/60 text-xs">{count}</span>
  </span>
</Button>

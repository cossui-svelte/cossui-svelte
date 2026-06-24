<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import { Button } from "$lib/components/ui/button";

  let isExpanded = $state(false);
</script>

<Button
  aria-controls="expandable-content"
  aria-expanded={isExpanded}
  class="gap-1"
  onclick={() => (isExpanded = !isExpanded)}
  variant="ghost"
>
  {isExpanded ? "Show less" : "Show more"}
  {#if isExpanded}
    <ChevronUp aria-hidden="true" class="-me-1" />
  {:else}
    <ChevronDown aria-hidden="true" class="-me-1" />
  {/if}
</Button>

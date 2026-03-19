<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { ChevronRight } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLLIElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<li
  aria-hidden="true"
  class={cn("opacity-80 [&>svg]:size-4", className)}
  data-slot="breadcrumb-separator"
  role="presentation"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRight />
  {/if}
</li>

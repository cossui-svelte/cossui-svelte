<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Clear
  aria-label="Clear"
  class={cn(
    "-translate-y-1/2 absolute end-0.5 top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-[color,background-color,box-shadow,opacity] pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className
  )}
  data-slot="autocomplete-clear"
  {...restProps as Record<string, unknown>}
>
  {#if children}
    {@render children()}
  {:else}
    <X />
  {/if}
</AutocompletePrimitive.Clear>

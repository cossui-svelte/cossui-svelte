<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { cn } from '#lib/utils.js';
  import {
    type ComposerItemValue,
    useComposerSuggestionsContext
  } from './composer-editor.svelte.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    ref?: HTMLDivElement | null;
    /** Rendered once per suggestion. Without a surrounding composer, render items directly via `fallback`. */
    children?: Snippet<[ComposerItemValue, number]>;
    fallback?: Snippet;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    fallback,
    ...restProps
  }: Props = $props();

  const suggestions = useComposerSuggestionsContext();
</script>

<ScrollArea
  class="flex flex-col *:data-[slot=scroll-area-viewport]:max-h-64 *:data-[slot=scroll-area-viewport]:min-h-0"
  overscrollContain
  scrollbarGutter
  scrollFade
>
  <div
    bind:this={
      () => ref,
      (element) => {
        ref = element;
        if (suggestions) suggestions.listElement = element;
      }
    }
    data-slot="composer-list"
    id={suggestions?.listId}
    role={suggestions ? 'listbox' : undefined}
    aria-label={suggestions ? 'Suggestions' : undefined}
    class={cn('not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3', className)}
    {...restProps}
  >
    {#if suggestions && children}
      {#each suggestions.items as item, index (item.id)}
        {@render children(item, index)}
      {/each}
    {:else}
      {@render fallback?.()}
    {/if}
  </div>
</ScrollArea>

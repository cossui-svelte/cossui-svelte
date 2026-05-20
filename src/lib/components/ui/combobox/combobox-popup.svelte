<script lang="ts">
import type { Combobox } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

interface Props extends Combobox.ContentProps {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Portal>
  <Combobox.Content
    class={cn(
      "relative flex max-h-full min-w-[var(--bits-combobox-anchor-width)] max-w-[var(--bits-combobox-content-available-width)] origin-[--bits-combobox-content-transform-origin] rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="combobox-popup"
    {...restProps}
  >
    <div
      class="flex max-h-[23rem] flex-1 flex-col overflow-y-auto p-1 text-foreground"
    >
      {@render children?.()}
    </div>
  </Combobox.Content>
</Combobox.Portal>

<script lang="ts">
import type { LinkPreview } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

interface Props extends LinkPreview.ContentProps {
  children?: Snippet;
  align?: LinkPreview.ContentProps['align'];
  sideOffset?: LinkPreview.ContentProps['sideOffset'];
}

let {
  class: className,
  children,
  align = 'center',
  sideOffset = 4,
  ...restProps
}: Props = $props();
</script>

<LinkPreview.Portal>
    <LinkPreview.Content
        {align}
        {sideOffset}
        class={cn(
            "relative flex w-64 origin-[--bits-link-preview-content-transform-origin] text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className,
        )}
        data-slot="preview-card-content"
        {...restProps}
    >
        {@render children?.()}
    </LinkPreview.Content>
</LinkPreview.Portal>

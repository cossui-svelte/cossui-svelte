<script lang="ts">
import type { DropdownMenu } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

interface Props extends DropdownMenu.SubContentProps {
  children?: Snippet;
}

let {
  children,
  class: className,
  sideOffset = 0,
  align = 'start',
  alignOffset,
  ...restProps
}: Props = $props();

const defaultAlignOffset = align !== 'center' ? -5 : undefined;
</script>

<DropdownMenu.Portal>
  <DropdownMenu.SubContent
    class={cn(
      "relative z-50 flex not-[class*='w-']:min-w-32 origin-(--bits-dropdown-menu-content-transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="menu-sub-content"
    {align}
    alignOffset={alignOffset ?? defaultAlignOffset}
    side="right"
    {sideOffset}
    {...restProps}
  >
    <div class="max-h-(--bits-dropdown-menu-content-available-height) w-full overflow-y-auto p-1">
      {@render children?.()}
    </div>
  </DropdownMenu.SubContent>
</DropdownMenu.Portal>

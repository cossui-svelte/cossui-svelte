<script lang="ts">
import type { Snippet } from 'svelte';
import { getContext } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

interface Props extends HTMLAttributes<HTMLDivElement> {
  position?: DrawerPosition;
  children?: Snippet;
}

let { class: className, position: positionProp, children, ...restProps }: Props = $props();

const ctx = getContext<{ position: () => DrawerPosition } | undefined>('drawer-position');
const position = $derived(positionProp ?? ctx?.position() ?? 'bottom');
const horizontal = $derived(position === 'left' || position === 'right');
</script>

<div
  aria-hidden="true"
  class={cn(
    "absolute flex touch-none items-center justify-center p-3 before:rounded-full before:bg-input",
    horizontal ? "inset-y-0 before:h-12 before:w-1" : "inset-x-0 before:h-1 before:w-12",
    position === "top" && "bottom-0",
    position === "bottom" && "top-0",
    position === "left" && "right-0",
    position === "right" && "left-0",
    className,
  )}
  data-slot="drawer-bar"
  {...restProps}
>
  {@render children?.()}
</div>

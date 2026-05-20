<script lang="ts" module>
import { tv, type VariantProps } from 'tailwind-variants';

const inputGroupAddonVariants = tv({
  base: "[&_svg]:-mx-0.5 flex h-auto cursor-text select-none items-center justify-center gap-2 leading-none [&>kbd]:rounded-[calc(var(--radius)-5px)] not-has-[button]:**:[svg:not([class*='opacity-'])]:opacity-80",
  defaultVariants: { align: 'inline-start' },
  variants: {
    align: {
      'block-end':
        'order-last w-full justify-start px-[calc(--spacing(3)-1px)] pb-[calc(--spacing(3)-1px)]',
      'block-start':
        'order-first w-full justify-start px-[calc(--spacing(3)-1px)] pt-[calc(--spacing(3)-1px)]',
      'inline-end': 'has-[>button]:-me-2 order-last pe-[calc(--spacing(3)-1px)]',
      'inline-start': 'has-[>button]:-ms-2 order-first ps-[calc(--spacing(3)-1px)]'
    }
  }
});

export type InputGroupAddonAlign = VariantProps<typeof inputGroupAddonVariants>['align'];
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    align = "inline-start",
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    align?: InputGroupAddonAlign;
  } = $props();

  function handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest(
      "button, a, input, select, textarea, [role='button'], [role='combobox'], [role='listbox'], [data-slot='select-trigger']",
    );
    if (isInteractive) return;
    e.preventDefault();
    const parent = (e.currentTarget as HTMLElement).parentElement;
    const input = parent?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea",
    );
    if (input && !parent?.querySelector("input:focus, textarea:focus")) {
      input.focus();
    }
  }
</script>

<div
  bind:this={ref}
  class={cn(inputGroupAddonVariants({ align }), className)}
  data-align={align}
  data-slot="input-group-addon"
  onmousedown={handleMouseDown}
  {...restProps}
>
  {@render children?.()}
</div>

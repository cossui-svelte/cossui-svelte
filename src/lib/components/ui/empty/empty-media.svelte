<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const emptyMediaVariants = tv({
    base: 'flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
    defaultVariants: {
      variant: 'default'
    },
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "relative flex size-9 shrink-0 items-center justify-center rounded-md border bg-card not-dark:bg-clip-padding text-foreground shadow-sm/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='size-'])]:size-4.5"
      }
    }
  });

  export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>['variant'];
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'default',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: EmptyMediaVariant;
  } = $props();
</script>

<div
  bind:this={ref}
  class={cn('relative mb-6', className)}
  data-slot="empty-media"
  data-variant={variant}
>
  {#if variant === 'icon'}
    <div
      aria-hidden="true"
      class={cn(
        emptyMediaVariants({ variant }),
        className,
        'pointer-events-none absolute bottom-px origin-bottom-left -translate-x-0.5 -rotate-10 scale-84 shadow-none'
      )}
    ></div>
    <div
      aria-hidden="true"
      class={cn(
        emptyMediaVariants({ variant }),
        className,
        'pointer-events-none absolute bottom-px origin-bottom-right translate-x-0.5 rotate-10 scale-84 shadow-none'
      )}
    ></div>
  {/if}
  <div class={cn(emptyMediaVariants({ variant }), className)} {...restProps}>
    {@render children?.()}
  </div>
</div>

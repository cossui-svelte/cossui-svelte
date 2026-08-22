<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const starRatingVariants = tv({
    base: 'inline-flex items-center gap-0.5',
    variants: {
      size: {
        default: '[&_svg]:size-5',
        lg: '[&_svg]:size-6',
        sm: '[&_svg]:size-4',
        xl: '[&_svg]:size-7'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  });

  export type StarRatingSize = VariantProps<typeof starRatingVariants>['size'];
  export type StarRatingState = 'empty' | 'full' | 'half';
</script>

<script lang="ts">
  import Star from '@lucide/svelte/icons/star';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
    /** Whether the value can land on half-star increments. */
    allowHalf?: boolean;
    disabled?: boolean;
    /** Custom rendering for each star, receives its 1-based index and fill state. */
    icon?: Snippet<[{ index: number; state: StarRatingState }]>;
    /** Accessible name for the control, exposed as aria-label. */
    label?: string;
    max?: number;
    /** Renders a hidden input so the value participates in native form submission. */
    name?: string;
    readonly?: boolean;
    ref?: HTMLDivElement | null;
    size?: StarRatingSize;
    value?: number;
  }

  let {
    ref = $bindable(null),
    value = $bindable(0),
    allowHalf = false,
    class: className,
    disabled = false,
    icon,
    id,
    label = 'Rating',
    max = 5,
    name,
    readonly = false,
    size = 'default',
    ...restProps
  }: Props = $props();

  let hoverValue = $state<number | null>(null);

  const step = $derived(allowHalf ? 0.5 : 1);
  const displayValue = $derived(hoverValue ?? value);
  const interactive = $derived(!disabled && !readonly);

  function clamp(next: number): number {
    return Math.min(max, Math.max(0, next));
  }

  function fillPercent(index: number): number {
    return Math.min(100, Math.max(0, (displayValue - (index - 1)) * 100));
  }

  function starState(index: number): StarRatingState {
    const percent = fillPercent(index);
    if (percent >= 100) return 'full';
    if (percent > 0) return 'half';
    return 'empty';
  }

  function valueFromPointer(
    index: number,
    event: { clientX: number; currentTarget: EventTarget | null }
  ): number {
    if (!allowHalf) return index;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const fraction = (event.clientX - rect.left) / rect.width;
    return fraction <= 0.5 ? index - 0.5 : index;
  }

  function handlePointerMove(index: number, event: PointerEvent) {
    if (!interactive) return;
    hoverValue = valueFromPointer(index, event);
  }

  function handlePointerLeave() {
    hoverValue = null;
  }

  function handleClick(index: number, event: MouseEvent) {
    if (!interactive) return;
    value = clamp(valueFromPointer(index, event));
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!interactive) return;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        value = clamp(value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        value = clamp(value - step);
        break;
      case 'Home':
        event.preventDefault();
        value = 0;
        break;
      case 'End':
        event.preventDefault();
        value = max;
        break;
    }
  }
</script>

<div
  bind:this={ref}
  {id}
  aria-disabled={disabled || undefined}
  aria-label={readonly ? `${value} out of ${max} stars` : label}
  aria-readonly={readonly || undefined}
  aria-valuemax={readonly ? undefined : max}
  aria-valuemin={readonly ? undefined : 0}
  aria-valuenow={readonly ? undefined : value}
  aria-valuetext={readonly ? undefined : `${value} out of ${max} stars`}
  class={cn(
    starRatingVariants({ size }),
    disabled && 'pointer-events-none opacity-64',
    readonly && 'cursor-default',
    className
  )}
  data-slot="starrating"
  onkeydown={handleKeydown}
  onpointerleave={handlePointerLeave}
  role={readonly ? 'img' : 'slider'}
  tabindex={readonly ? undefined : disabled ? -1 : 0}
  {...restProps}
>
  {#each Array.from({ length: max }) as _, i (i)}
    {@const index = i + 1}
    {@const percent = fillPercent(index)}
    <span
      aria-hidden="true"
      class={cn('relative inline-flex', interactive && 'cursor-pointer')}
      data-slot="starrating-star"
      onclick={(event) => handleClick(index, event)}
      onpointermove={(event) => handlePointerMove(index, event)}
    >
      {#if icon}
        {@render icon({ index, state: starState(index) })}
      {:else}
        <Star class="text-muted-foreground" />
        <span class="absolute inset-0 overflow-hidden" style="width: {percent}%">
          <Star class="fill-yellow-400 text-yellow-400" />
        </span>
      {/if}
    </span>
  {/each}
  {#if name}
    <input {disabled} {name} type="hidden" {value}>
  {/if}
</div>

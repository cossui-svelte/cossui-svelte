<script lang="ts" module>
  export interface NumberFieldContext {
    applyDelta(delta: number): void;
    decrement(): void;
    readonly disabled: boolean;
    readonly fieldId: string;
    increment(): void;
    readonly max: number | undefined;
    readonly min: number | undefined;
    setValue(v: number): void;
    readonly step: number;
    readonly value: number | undefined;
  }

  export const NUMBER_FIELD_CONTEXT_KEY = Symbol.for('cossui:number-field');
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    children?: Snippet;
    disabled?: boolean;
    id?: string;
    max?: number;
    min?: number;
    size?: 'sm' | 'default' | 'lg';
    step?: number;
    value?: number;
  }

  let {
    id,
    class: className,
    size = 'default',
    value = $bindable<number | undefined>(undefined),
    min,
    max,
    step = 1,
    disabled = false,
    children,
    ...restProps
  }: Props = $props();

  // Generate a unique ID if none is provided
  let generatedId = $state(`number-field-${Math.random().toString(36).slice(2, 9)}`);
  let fieldId = $derived(id ?? generatedId);

  function clamp(v: number): number {
    let result = v;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  }

  // Number of decimal places in `step`, used to round away binary
  // floating-point drift (e.g. 0.1 + 0.1 === 0.20000000000000004).
  function getDecimalPlaces(n: number): number {
    if (!Number.isFinite(n)) return 0;
    const str = n.toString();
    if (str.includes('e-')) return Number(str.split('e-')[1]);
    const dotIndex = str.indexOf('.');
    return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
  }

  function roundToStep(v: number): number {
    const decimals = getDecimalPlaces(step);
    if (decimals === 0) return v;
    const factor = 10 ** decimals;
    return Math.round(v * factor) / factor;
  }

  function increment() {
    value = clamp(roundToStep((value ?? 0) + step));
  }

  function decrement() {
    value = clamp(roundToStep((value ?? 0) - step));
  }

  function setValue(v: number) {
    value = clamp(v);
  }

  function applyDelta(delta: number) {
    value = clamp(roundToStep((value ?? 0) + delta));
  }

  setContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY, {
    applyDelta,
    decrement,
    get disabled() {
      return disabled;
    },
    get fieldId() {
      return fieldId;
    },
    increment,
    get max() {
      return max;
    },
    get min() {
      return min;
    },
    setValue,
    get step() {
      return step;
    },
    get value() {
      return value;
    }
  });
</script>

<div
  class={cn('flex w-full flex-col items-start', className)}
  data-size={size}
  data-slot="number-field"
  data-disabled={disabled ? '' : undefined}
  id={fieldId}
  {...restProps}
>
  {@render children?.()}
</div>

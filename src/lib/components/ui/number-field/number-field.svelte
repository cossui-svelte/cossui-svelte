<script lang="ts" module>
  export interface NumberFieldContext {
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

  export const NUMBER_FIELD_CONTEXT_KEY = Symbol.for("cossui:number-field");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
    children?: Snippet;
    disabled?: boolean;
    id?: string;
    max?: number;
    min?: number;
    size?: "sm" | "default" | "lg";
    step?: number;
    value?: number;
  }

  let {
    id,
    class: className,
    size = "default",
    value = $bindable<number | undefined>(undefined),
    min,
    max,
    step = 1,
    disabled = false,
    children,
    ...restProps
  }: Props = $props();

  // Generate a unique ID if none is provided
  let generatedId = $state(
    `number-field-${Math.random().toString(36).slice(2, 9)}`,
  );
  let fieldId = $derived(id ?? generatedId);

  function clamp(v: number): number {
    let result = v;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  }

  function increment() {
    value = clamp((value ?? 0) + step);
  }

  function decrement() {
    value = clamp((value ?? 0) - step);
  }

  function setValue(v: number) {
    value = clamp(v);
  }

  setContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY, {
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
    },
  });
</script>

<div
  class={cn("flex w-full flex-col items-start", className)}
  data-size={size}
  data-slot="number-field"
  data-disabled={disabled ? "" : undefined}
  id={fieldId}
  {...restProps}
>
  {@render children?.()}
</div>

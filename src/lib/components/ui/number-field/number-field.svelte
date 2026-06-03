<script lang="ts" module>
  export interface NumberFieldContext {
    readonly fieldId: string;
    readonly value: number | undefined;
    readonly min: number | undefined;
    readonly max: number | undefined;
    readonly step: number;
    readonly disabled: boolean;
    increment(): void;
    decrement(): void;
    setValue(v: number): void;
  }

  export const NUMBER_FIELD_CONTEXT_KEY = Symbol.for("cossui:number-field");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { setContext } from "svelte";
  import { cn } from "$lib/utils";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
    id?: string;
    size?: "sm" | "default" | "lg";
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    children?: Snippet;
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
    get fieldId() {
      return fieldId;
    },
    get value() {
      return value;
    },
    get min() {
      return min;
    },
    get max() {
      return max;
    },
    get step() {
      return step;
    },
    get disabled() {
      return disabled;
    },
    increment,
    decrement,
    setValue,
  });
</script>

<div
  class={cn("flex w-full flex-col items-start gap-2", className)}
  data-size={size}
  data-slot="number-field"
  data-disabled={disabled ? "" : undefined}
  id={fieldId}
  {...restProps}
>
  {@render children?.()}
</div>

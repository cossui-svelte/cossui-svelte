<script lang="ts">
  import { getContext } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import {
    NUMBER_FIELD_CONTEXT_KEY,
    type NumberFieldContext,
  } from "./number-field.svelte";

  type Props = Omit<
    HTMLInputAttributes,
    "id" | "type" | "value" | "min" | "max" | "step" | "disabled"
  >;

  let { class: className, ...restProps }: Props = $props();

  const ctx = getContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY);

  function handleChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const v = parseFloat(input.value);
    if (!isNaN(v)) {
      ctx?.setValue(v);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      ctx?.increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      ctx?.decrement();
    }
  }
</script>

<input
  type="text"
  inputmode="decimal"
  role="spinbutton"
  id={ctx?.fieldId}
  value={ctx?.value ?? ""}
  min={ctx?.min}
  max={ctx?.max}
  step={ctx?.step}
  disabled={ctx?.disabled}
  aria-valuenow={ctx?.value}
  aria-valuemin={ctx?.min}
  aria-valuemax={ctx?.max}
  class={cn(
    "h-8.5 in-data-[size=lg]:h-9.5 in-data-[size=sm]:h-7.5 w-full min-w-0 grow bg-transparent in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] text-center tabular-nums in-data-[size=lg]:leading-9.5 in-data-[size=sm]:leading-7.5 leading-8.5 outline-none [transition:background-color_5000000s_ease-in-out_0s] sm:h-7.5 sm:in-data-[size=lg]:h-8.5 sm:in-data-[size=sm]:h-6.5 sm:in-data-[size=lg]:leading-8.5 sm:in-data-[size=sm]:leading-8.5 sm:leading-7.5",
    className,
  )}
  data-slot="number-field-input"
  onchange={handleChange}
  onkeydown={handleKeydown}
  {...restProps}
/>

<script lang="ts">
  import PlusIcon from "@lucide/svelte/icons/plus";
  import { getContext } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import {
    NUMBER_FIELD_CONTEXT_KEY,
    type NumberFieldContext,
  } from "./number-field.svelte";

  type Props = Omit<HTMLButtonAttributes, "type" | "disabled" | "onclick">;

  let { class: className, ...restProps }: Props = $props();

  const ctx = getContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY);

  let isAtMax = $derived(
    ctx?.value !== undefined && ctx?.max !== undefined
      ? ctx.value >= ctx.max
      : false,
  );
</script>

<button
  type="button"
  aria-label="Increase"
  disabled={ctx?.disabled || isAtMax}
  class={cn(
    "relative flex shrink-0 cursor-pointer items-center justify-center rounded-e-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent disabled:pointer-events-none disabled:opacity-50",
    className,
  )}
  data-slot="number-field-increment"
  onclick={() => ctx?.increment()}
  {...restProps}
>
  <PlusIcon />
</button>

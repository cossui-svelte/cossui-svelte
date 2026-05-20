<script lang="ts" module>
  export interface ProgressContext {
    readonly value: number | null;
    readonly min: number;
    readonly max: number;
    readonly percentage: number;
    readonly indeterminate: boolean;
  }

  export const PROGRESS_CONTEXT_KEY = Symbol.for("cossui:progress");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { Progress as ProgressPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { ProgressIndicator, ProgressTrack } from ".";

  type Props = ProgressPrimitive.RootProps & { children?: Snippet };

  let {
    class: className,
    value = 0,
    min = 0,
    max = 100,
    children,
    ...restProps
  }: Props = $props();

  let indeterminate = $derived(value === null);
  let percentage = $derived(
    indeterminate ? 0 : (((value as number) - min) / (max - min)) * 100,
  );

  setContext<ProgressContext>(PROGRESS_CONTEXT_KEY, {
    get value() {
      return value as number | null;
    },
    get min() {
      return min;
    },
    get max() {
      return max;
    },
    get percentage() {
      return percentage;
    },
    get indeterminate() {
      return indeterminate;
    },
  });
</script>

<ProgressPrimitive.Root
  class={cn("flex w-full flex-col gap-2", className)}
  data-slot="progress"
  {value}
  {min}
  {max}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  {/if}
</ProgressPrimitive.Root>

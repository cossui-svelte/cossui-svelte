<script lang="ts" module>
  export interface ProgressContext {
    readonly indeterminate: boolean;
    readonly max: number;
    readonly min: number;
    readonly percentage: number;
    readonly value: number | null;
  }

  export const PROGRESS_CONTEXT_KEY = Symbol.for("cossui:progress");
</script>

<script lang="ts">
  import { Progress as ProgressPrimitive } from "bits-ui";
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { cn } from "$lib/utils";
  import ProgressIndicator from "./progress-indicator.svelte";
  import ProgressTrack from "./progress-track.svelte";

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
    get indeterminate() {
      return indeterminate;
    },
    get max() {
      return max;
    },
    get min() {
      return min;
    },
    get percentage() {
      return percentage;
    },
    get value() {
      return value as number | null;
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

<script lang="ts" module>
  export interface MeterContext {
    readonly max: number;
    readonly min: number;
    readonly percentage: number;
    readonly value: number;
  }

  export const METER_CONTEXT_KEY = Symbol.for("cossui:meter");
</script>

<script lang="ts">
  import { Meter as MeterPrimitive } from "bits-ui";
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { cn } from "$lib/utils";
  import MeterTrack from "./meter-track.svelte";
  import MeterIndicator from "./meter-indicator.svelte";

  type Props = MeterPrimitive.RootProps & { children?: Snippet };

  let {
    class: className,
    value = 0,
    min = 0,
    max = 100,
    children,
    ...restProps
  }: Props = $props();

  let percentage = $derived(((value - min) / (max - min)) * 100);

  setContext<MeterContext>(METER_CONTEXT_KEY, {
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
      return value;
    },
  });
</script>

<MeterPrimitive.Root
  class={cn("flex w-full flex-col gap-2", className)}
  data-slot="meter"
  {value}
  {min}
  {max}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <MeterTrack>
      <MeterIndicator />
    </MeterTrack>
  {/if}
</MeterPrimitive.Root>

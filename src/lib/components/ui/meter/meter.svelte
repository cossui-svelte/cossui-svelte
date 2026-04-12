<script lang="ts" module>
  export interface MeterContext {
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly percentage: number;
  }

  export const METER_CONTEXT_KEY = Symbol.for("cossui:meter");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { Meter as MeterPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

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
    get value() {
      return value;
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
    <div
      class="block h-2 w-full overflow-hidden bg-input"
      data-slot="meter-track"
    >
      <div
        class="bg-primary transition-all duration-500"
        data-slot="meter-indicator"
        style="width: {percentage}%"
      ></div>
    </div>
  {/if}
</MeterPrimitive.Root>

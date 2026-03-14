<script lang="ts">
  import type { Snippet } from "svelte";
  import { Slider } from "bits-ui";
  import { cn } from "../utils.js";

  interface Props extends Slider.RootProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Slider.Root
  class={cn("data-[orientation=horizontal]:w-full", className)}
  thumbAlignment="trail"
  {...restProps}
>
  {#snippet children({ thumbs })}
    <Slider.Control
      class="flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64"
      data-slot="slider-control"
    >
      <Slider.Track
        class="relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5"
        data-slot="slider-track"
      >
        <Slider.Range
          class="select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5"
          data-slot="slider-indicator"
        />
        {#each thumbs as index}
          <Slider.Thumb
            class="block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-[state=dragging]:scale-120 sm:size-4 dark:border-background"
            data-slot="slider-thumb"
            {index}
          />
        {/each}
      </Slider.Track>
    </Slider.Control>
  {/snippet}
</Slider.Root>

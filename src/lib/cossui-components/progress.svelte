<script lang="ts">
  import type { Snippet } from "svelte";
  import { Progress } from "bits-ui";
  import { cn } from "../utils.js";

  type Props = Progress.RootProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Progress.Root
  class={cn("flex w-full flex-col gap-2", className)}
  data-slot="progress"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <div
      class="block h-1.5 w-full overflow-hidden rounded-full bg-input"
      data-slot="progress-track"
    >
      <div
        class="bg-primary transition-all duration-500"
        data-slot="progress-indicator"
      />
    </div>
  {/if}
</Progress.Root>

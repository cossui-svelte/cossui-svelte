<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import { Command } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Command.InputProps;

  let { ref = $bindable(null), class: className, ...restProps }: Props = $props();
</script>

<div class="shrink-0 px-2.5 py-1.5">
  <div class="relative flex items-center">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4"
    >
      <Search />
    </div>
    <Command.Input
      bind:ref
      class={cn(
        "h-9.5 w-full rounded-lg bg-transparent ps-9 pe-3 text-base outline-none placeholder:text-muted-foreground/72 sm:h-8.5 sm:text-sm",
        className,
      )}
      data-slot="command-input"
      {...restProps}
    />
  </div>
</div>

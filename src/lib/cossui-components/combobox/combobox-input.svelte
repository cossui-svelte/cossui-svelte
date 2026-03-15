<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";
  import { ChevronsUpDown } from "lucide-svelte";
  import { cn } from "../../utils.js";

  interface Props extends Combobox.InputProps {
    showTrigger?: boolean;
    children?: Snippet;
  }

  let { class: className, showTrigger = true, children, ...restProps }: Props = $props();
</script>

<div class="relative w-full text-foreground has-disabled:opacity-64">
  <Combobox.Input
    class={cn(
      "relative inline-flex w-full rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 outline-none sm:text-sm",
      showTrigger && "pe-9 sm:pe-8",
      className,
    )}
    data-slot="combobox-input"
    {...restProps}
  />
  {#if showTrigger}
    <Combobox.Trigger
      class="-translate-y-1/2 absolute end-0.5 top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 hover:opacity-100 sm:size-7"
      data-slot="combobox-trigger"
    >
      <ChevronsUpDown class="size-4.5 sm:size-4" />
    </Combobox.Trigger>
  {/if}
</div>

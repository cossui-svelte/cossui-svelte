<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { cn } from "$lib/utils";

  interface Props extends Omit<DropdownMenu.RadioItemProps, "children"> {
    children?: Snippet;
  }

  let {
    children: userContent,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.RadioItem
  closeOnSelect={false}
  class={cn(
    "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[.75rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  data-slot="menu-radio-item"
  {...restProps}
>
  {#snippet children({ checked }: { checked: boolean })}
    <span class="-ms-0.5 col-start-1 flex items-center justify-center">
      {#if checked}
        <svg
          aria-hidden="true"
          fill="none"
          height="24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      {/if}
    </span>
    <span class="col-start-2">{@render userContent?.()}</span>
  {/snippet}
</DropdownMenu.RadioItem>

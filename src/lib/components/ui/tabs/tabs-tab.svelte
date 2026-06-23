<script lang="ts">
  import { Tabs } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Tabs.TriggerProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Tabs.Trigger
  class={cn(
    "[&_svg]:-mx-0.5 relative flex h-9 shrink-0 grow cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-[disabled]:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[state=active]:text-foreground data-[disabled]:opacity-64 sm:h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  data-slot="tabs-tab"
  {...restProps}
>
  {@render children?.()}
</Tabs.Trigger>

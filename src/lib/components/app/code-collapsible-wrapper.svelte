<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import Button from "$lib/components/ui/button/button.svelte";
  import Collapsible from "$lib/components/ui/collapsible/collapsible.svelte";
  import CollapsiblePanel from "$lib/components/ui/collapsible/collapsible-panel.svelte";
  import CollapsibleTrigger from "$lib/components/ui/collapsible/collapsible-trigger.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  let {
    class: className,
    children,
    ...restProps
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();

  let isOpened = $state(false);
</script>

<Collapsible
  class={cn("group/collapsible relative md:-mx-1", className)}
  bind:open={isOpened}
  {...restProps}
>
  <div class="absolute top-1.5 right-10 z-10 flex items-center">
    <CollapsibleTrigger>
      <Button class="text-muted-foreground" variant="ghost">
        {isOpened ? "Collapse" : "Expand"}
      </Button>
    </CollapsibleTrigger>
    <Separator class="mx-1.5 h-5" orientation="vertical" />
  </div>
  <CollapsiblePanel
    class="[&>figure]:md:mx-0! relative mt-6 h-full overflow-hidden data-closed:max-h-64 [&>figure]:mt-0"
  >
    {@render children?.()}
  </CollapsiblePanel>
  <CollapsibleTrigger
    class="absolute inset-x-0 -bottom-2 flex h-20 cursor-pointer items-center justify-center rounded-b-lg bg-linear-to-b from-transparent via-50% via-background to-background font-medium text-muted-foreground text-sm transition-colors hover:text-foreground group-data-open/collapsible:hidden"
  >
    {isOpened ? "Collapse" : "Expand"}
  </CollapsibleTrigger>
</Collapsible>

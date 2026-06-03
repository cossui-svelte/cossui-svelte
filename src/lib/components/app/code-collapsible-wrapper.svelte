<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible } from "bits-ui";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "$lib/components/ui/button";
  import CollapsiblePanel from "$lib/components/ui/collapsible/collapsible-panel.svelte";
  import { Separator } from "$lib/components/ui/separator";

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();

  let isOpened = $state(false);
</script>

<Collapsible.Root
  class={cn("group/collapsible md:-mx-1 relative", className)}
  onOpenChange={(v) => (isOpened = v)}
  open={isOpened}
>
  <div class="absolute top-1.5 right-10 z-10 flex items-center">
    <Collapsible.Trigger>
      {#snippet child({ props })}
        <button
          {...props}
          class={cn(
            buttonVariants({ variant: "ghost" }),
            "text-muted-foreground",
          )}
          type="button"
        >
          {isOpened ? "Collapse" : "Expand"}
        </button>
      {/snippet}
    </Collapsible.Trigger>
    <Separator class="mx-1.5 h-5" orientation="vertical" />
  </div>
  <CollapsiblePanel
    class="[&>figure]:md:!mx-0 relative mt-6 h-full overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0"
    forceMount={true}
  >
    {@render children?.()}
  </CollapsiblePanel>
  <Collapsible.Trigger
    class="-bottom-2 absolute inset-x-0 flex h-20 cursor-pointer items-center justify-center rounded-b-lg bg-gradient-to-b from-transparent via-50% via-background to-background font-medium text-muted-foreground text-sm transition-colors hover:text-foreground group-data-[state=open]/collapsible:hidden"
  >
    {isOpened ? "Collapse" : "Expand"}
  </Collapsible.Trigger>
</Collapsible.Root>

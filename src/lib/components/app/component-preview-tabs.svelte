<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import { Tabs, TabsList, TabsTab } from "$lib/components/ui/tabs";

  let {
    class: className,
    align = "center",
    hideCode = true,
    children,
    source,
  }: {
    class?: string;
    align?: "center" | "start" | "end";
    hideCode?: boolean;
    children?: Snippet;
    source?: Snippet;
  } = $props();

  let tab = $state("preview");
</script>

<div class={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}>
  <Tabs onValueChange={(v) => (tab = v)} value={tab}>
    <div class="flex items-center justify-between">
      {#if !hideCode}
        <TabsList
          class="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none"
        >
          <TabsTab class="rounded-lg" value="preview">Preview</TabsTab>
          <TabsTab class="rounded-lg" value="code">Code</TabsTab>
        </TabsList>
      {/if}
    </div>
  </Tabs>
  <div class="relative rounded-xl border not-dark:bg-card" data-tab={tab}>
    <div
      class="invisible data-[active=true]:visible"
      data-active={tab === "preview"}
    >
      <div
        class="flex h-[450px] w-full justify-center overflow-y-auto p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-6"
        data-align={align}
      >
        <div data-slot="preview">
          {@render children?.()}
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:m-0! **:[pre]:h-[450px]"
      data-active={tab === "code"}
      data-slot="code"
    >
      {@render source?.()}
    </div>
  </div>
</div>

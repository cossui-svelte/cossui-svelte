<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Tooltip } from "bits-ui";
  import { Terminal, Copy, Check } from "lucide-svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import Tabs from "$lib/components/ui/tabs/tabs.svelte";
  import TabsList from "$lib/components/ui/tabs/tabs-list.svelte";
  import TabsTab from "$lib/components/ui/tabs/tabs-tab.svelte";
  import TabsPanel from "$lib/components/ui/tabs/tabs-panel.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  interface Props {
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
  }

  let { __npm__, __yarn__, __pnpm__, __bun__ }: Props = $props();

  let packageManager = $state<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const tabs = $derived({
    bun: __bun__,
    npm: __npm__,
    pnpm: __pnpm__,
    yarn: __yarn__,
  });

  async function copyCommand() {
    const command = tabs[packageManager];
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      isCopied = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
</script>

<div class="relative">
  <Tabs
    class="gap-0"
    onValueChange={(value) =>
      (packageManager = value as "pnpm" | "npm" | "yarn" | "bun")}
    value={packageManager}
  >
    <div
      class="flex items-center gap-2 border-border/64 border-b px-4 py-1 font-mono"
    >
      <Terminal class="size-5 text-code-foreground sm:size-4" strokeWidth={2} />
      <TabsList
        class="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none"
      >
        {#each Object.entries(tabs) as [key]}
          <TabsTab class="rounded-lg" value={key}>
            {key}
          </TabsTab>
        {/each}
      </TabsList>
    </div>
    <ScrollArea
      class="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2"
    >
      {#each Object.entries(tabs) as [key, value]}
        <TabsPanel class="mt-0 w-max px-4 py-3.5" value={key}>
          <pre><code
              class="relative font-mono text-[.8125rem] leading-none"
              data-language="bash">{value}</code
            ></pre>
        </TabsPanel>
      {/each}
    </ScrollArea>
  </Tabs>
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <button
            {...props}
            class={cn(
              buttonVariants({ size: "icon", variant: "ghost" }),
              "absolute top-1.5 right-1.5 z-3 size-9 opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8",
            )}
            data-slot="copy-button"
            onclick={copyCommand}
            type="button"
          >
            <span class="sr-only">Copy</span>
            {#if isCopied}
              <Check class="size-4" strokeWidth={2} />
            {:else}
              <Copy class="size-4" strokeWidth={2} />
            {/if}
          </button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          class="relative flex origin-[--bits-tooltip-content-transform-origin] text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
          sideOffset={4}
        >
          <div class="relative size-full overflow-clip px-2 py-1">
            {isCopied ? "Copied" : "Copy to Clipboard"}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
</div>

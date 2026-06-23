<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Copy from "@lucide/svelte/icons/copy";
  import Terminal from "@lucide/svelte/icons/terminal";
  import { buttonVariants } from "$lib/components/ui/button";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Tabs, TabsList, TabsPanel, TabsTab } from "$lib/components/ui/tabs";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import { config } from "$lib/hooks/use-pkgmgr-config.svelte";
  import { cn } from "$lib/utils";

  interface Props {
    __bun__?: string;
    __npm__?: string;
    __pnpm__?: string;
    __yarn__?: string;
  }

  let { __npm__, __yarn__, __pnpm__, __bun__ }: Props = $props();

  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const tabs = $derived({
    bun: __bun__,
    npm: __npm__,
    pnpm: __pnpm__,
    yarn: __yarn__,
  });

  async function copyCommand() {
    const command = tabs[config.packageManager];
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
      (config.packageManager = value as "pnpm" | "npm" | "yarn" | "bun")}
    value={config.packageManager}
  >
    <div
      class="flex items-center gap-2 border-border/64 border-b px-4 py-1 font-mono"
    >
      <Terminal class="size-5 text-code-foreground sm:size-4" strokeWidth={2} />
      <TabsList
        class="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none"
      >
        {#each Object.entries(tabs) as [key] (key)}
          <TabsTab class="rounded-lg" value={key}>
            {key}
          </TabsTab>
        {/each}
      </TabsList>
    </div>
    <ScrollArea
      class="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2"
    >
      {#each Object.entries(tabs) as [key, value] (key)}
        <TabsPanel class="mt-0 w-max px-4 py-3.5" value={key}>
          <pre><code
              class="relative font-mono text-[.8125rem] leading-none"
              data-language="bash">{value}</code
            ></pre>
        </TabsPanel>
      {/each}
    </ScrollArea>
  </Tabs>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props }: { props: Record<string, unknown> })}
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
      </TooltipTrigger>
      <TooltipPopup>
        {isCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipPopup>
    </Tooltip>
  </TooltipProvider>
</div>

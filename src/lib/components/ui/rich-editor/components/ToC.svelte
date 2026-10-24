<script lang="ts" module>
  let tocItems = $state<TableOfContentData>([]);
  export const setTocItems = (items: TableOfContentData) => {
    tocItems = items;
  };
</script>

<script lang="ts">
  import { type TableOfContentData } from '@tiptap/extension-table-of-contents';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';
</script>

<TooltipProvider>
  <Tooltip delay={100}>
    <TooltipTrigger class="fixed top-1/3 right-2 my-auto flex flex-col gap-2 print:hidden">
      {#each tocItems as item (item.id)}
        <span
          class={cn(
            'block! h-0.5! w-4 rounded! bg-muted-foreground/50 dark:bg-muted',
            item.isActive && 'bg-primary!',
            item.level === 1 ? 'w-6' : 'w-4'
          )}
        ></span>
      {/each}
    </TooltipTrigger>
    <TooltipPopup
      side="left"
      sideOffset={-24}
      align="start"
      class="max-h-120 min-h-8 max-w-56 items-start gap-1.5 overflow-auto border bg-popover duration-300 fade-in-50 data-[side=left]:slide-in-from-right-30"
    >
      {#if tocItems === undefined || tocItems.length === 0}
        <div>No contents</div>
      {:else}
        <div class="flex flex-col gap-1.5">
          {#each tocItems as item (item.id)}
            <a
              href={`#${item.id}`}
              class={cn(
                'nodefault text-sm text-wrap text-foreground transition-all duration-500',
                item.isScrolledOver && 'text-muted-foreground italic'
              )}
              style={`padding-left: calc(1rem * ${item.level - 1});`}
            >
              {item.textContent}
            </a>
          {/each}
        </div>
      {/if}
    </TooltipPopup>
  </Tooltip>
</TooltipProvider>

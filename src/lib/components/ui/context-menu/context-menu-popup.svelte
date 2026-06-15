<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";
  import { cn } from "$lib/utils";

  interface Props extends ContextMenu.ContentProps {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: Props = $props();
</script>

<ContextMenu.Portal>
  <ContextMenu.Content
    class={cn(
      "relative z-50 flex not-[class*='w-']:min-w-32 origin-(--bits-context-menu-content-transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="context-menu-popup"
    {...restProps}
  >
    <div
      class="max-h-(--bits-context-menu-content-available-height) w-full overflow-y-auto p-1"
    >
      {@render children?.()}
    </div>
  </ContextMenu.Content>
</ContextMenu.Portal>

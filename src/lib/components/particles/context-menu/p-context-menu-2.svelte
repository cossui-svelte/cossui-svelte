<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuPopup,
    ContextMenuTrigger,
  } from "$lib/components/ui/context-menu";
</script>

<ContextMenu>
  <ContextMenuTrigger class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuItem>
      {#snippet child({ props })}
        <a href={resolve("/docs")} {...props}>Docs</a>
      {/snippet}
    </ContextMenuItem>
    <ContextMenuItem>
      {#snippet child({ props })}
        <a href={resolve("/particles")} {...props}>Particles</a>
      {/snippet}
    </ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>

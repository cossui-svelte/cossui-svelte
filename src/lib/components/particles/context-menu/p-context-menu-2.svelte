<script lang="ts">
  import {
    ContextMenu,
    ContextMenuLinkItem,
    ContextMenuPopup,
    ContextMenuTrigger
  } from '$lib/components/ui/context-menu';
  import { resolve } from '$app/paths';
</script>

<ContextMenu>
  <ContextMenuTrigger
    class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm"
  >
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuLinkItem href={resolve('/docs')}>Docs</ContextMenuLinkItem>
    <ContextMenuLinkItem href={resolve('/particles')}>Particles</ContextMenuLinkItem>
  </ContextMenuPopup>
</ContextMenu>

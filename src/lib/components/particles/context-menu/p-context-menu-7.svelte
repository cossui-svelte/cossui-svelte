<script lang="ts">
  import {
    ContextMenu,
    ContextMenuPopup,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuTrigger,
  } from "$lib/components/ui/context-menu";

  let theme = $state("system");
</script>

<ContextMenu>
  <ContextMenuTrigger class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuRadioGroup bind:value={theme}>
      <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
      <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
      <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuPopup>
</ContextMenu>

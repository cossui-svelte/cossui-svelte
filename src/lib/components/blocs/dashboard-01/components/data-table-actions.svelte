<script lang="ts">
  import DotsVerticalIcon from '@lucide/svelte/icons/ellipsis-vertical';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
</script>

<Menu>
  <MenuTrigger
    class={cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'flex size-8 text-muted-foreground data-popup-open:bg-muted'
    )}
  >
    <DotsVerticalIcon />
    <span class="sr-only">Open menu</span>
  </MenuTrigger>
  <MenuPopup align="end" class="w-32">
    <MenuItem>Edit</MenuItem>
    <MenuItem>Make a copy</MenuItem>
    <MenuItem>Favorite</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuPopup>
</Menu>

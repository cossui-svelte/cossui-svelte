<script lang="ts">
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
</script>

<InputGroup>
  <InputGroupInput value="hello@coss.com" placeholder="Enter email" type="email" />
  <InputGroupAddon align="inline-end">
    <Badge variant="info">Primary</Badge>
    <Menu>
      <MenuTrigger
        aria-label="Open menu"
        class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
      >
        <Ellipsis />
      </MenuTrigger>
      <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
        <MenuItem disabled>Make Primary</MenuItem>
        <MenuItem variant="destructive">Delete</MenuItem>
      </MenuPopup>
    </Menu>
  </InputGroupAddon>
</InputGroup>

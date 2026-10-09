<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field } from '#lib/components/ui/field/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';

  let {
    email,
    isPrimary,
    isVerified
  }: { email: string; isPrimary?: boolean; isVerified?: boolean } = $props();
</script>

<Field class="contents">
  <InputGroup>
    <InputGroupInput type="email" value={email} />
    <InputGroupAddon align="inline-end">
      {#if isPrimary}<Badge variant="info">Primary</Badge>{/if}
      {#if !isVerified}<Badge variant="warning">Unverified</Badge>{/if}
      <Menu>
        <MenuTrigger
          aria-label="Email options"
          class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
        >
          <EllipsisIcon />
        </MenuTrigger>
        <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
          <MenuItem disabled={isPrimary}>Make primary</MenuItem>
          <MenuItem disabled={isVerified}>Resend verification</MenuItem>
          <MenuItem disabled={isPrimary} variant="destructive">Remove email</MenuItem>
        </MenuPopup>
      </Menu>
    </InputGroupAddon>
  </InputGroup>
</Field>

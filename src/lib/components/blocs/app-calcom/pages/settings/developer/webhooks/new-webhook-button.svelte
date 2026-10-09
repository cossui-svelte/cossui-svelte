<script lang="ts" module>
  export type CreateForOption = {
    id: string;
    name: string;
    type: 'user' | 'organization';
    initials: string;
    avatar?: string;
  };

  const createForOptions: CreateForOption[] = [
    {
      avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=72&h=72&dpr=2&q=80',
      id: 'user-1',
      initials: 'AE',
      name: 'Admin Example',
      type: 'user'
    },
    { id: 'org-1', initials: 'AI', name: 'Acme Inc.', type: 'organization' },
    { id: 'org-2', initials: 'OR', name: 'org', type: 'organization' },
    { id: 'org-3', initials: 'FS', name: 'fssf', type: 'organization' }
  ];
</script>

<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';

  let { text, onSelect }: { text: string; onSelect?: (option: CreateForOption) => void } = $props();
</script>

<Menu>
  <MenuTrigger class={buttonVariants()}>
    <PlusIcon aria-hidden="true" />
    {text}
  </MenuTrigger>
  <MenuPopup>
    <MenuGroup>
      <MenuGroupLabel>Create for</MenuGroupLabel>
      {#each createForOptions as item (item.id)}
        <MenuItem onclick={() => onSelect?.(item)}>
          <span class="flex items-center gap-2">
            <Avatar class="size-5">
              {#if item.avatar}
                <AvatarImage alt={item.name} src={item.avatar} />
              {/if}
              <AvatarFallback class="text-[.625rem]">{item.initials}</AvatarFallback>
            </Avatar>
            <span class="truncate">{item.name}</span>
          </span>
        </MenuItem>
      {/each}
    </MenuGroup>
  </MenuPopup>
</Menu>

<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { CommandDialogTrigger } from '#lib/components/ui/command/index.js';
  import { SidebarMenuButton } from '../ui/index.js';
  import { commandHandle } from './app-command/command-handle.js';
  import UserMenu from './user-menu.svelte';
</script>

<div class="flex items-center gap-0.5 md:flex-col lg:flex-row">
  <SidebarMenuButton
    aria-label="Search"
    class="shrink-0 justify-center p-0 md:max-lg:order-1 lg:size-8"
  >
    {#snippet child({ props })}
      <CommandDialogTrigger handle={commandHandle} {...props}>
        <SearchIcon />
      </CommandDialogTrigger>
    {/snippet}
  </SidebarMenuButton>
  <SidebarMenuButton class="shrink-0 justify-center p-0 lg:size-8" href="#">
    <Avatar class="lg:size-6">
      <AvatarImage
        alt="Luke Tracy"
        src="https://pbs.twimg.com/profile_images/1994776674391457792/7utKOMi6_400x400.jpg"
      />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>
  </SidebarMenuButton>
  <UserMenu />
</div>

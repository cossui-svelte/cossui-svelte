<script lang="ts">
  import BellIcon from '@lucide/svelte/icons/bell';
  import CheckIcon from '@lucide/svelte/icons/check';
  import GlobeIcon from '@lucide/svelte/icons/globe';
  import HouseIcon from '@lucide/svelte/icons/house';
  import KeyboardIcon from '@lucide/svelte/icons/keyboard';
  import LinkIcon from '@lucide/svelte/icons/link';
  import LockIcon from '@lucide/svelte/icons/lock';
  import MenuIcon from '@lucide/svelte/icons/menu';
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
  import PaintbrushIcon from '@lucide/svelte/icons/paintbrush';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import VideoIcon from '@lucide/svelte/icons/video';
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '$lib/components/ui/breadcrumb';
  import { buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogDescription,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
  } from '$lib/components/ui/sidebar';
  import { cn } from '$lib/utils';

  const data = {
    nav: [
      { name: 'Notifications', icon: BellIcon },
      { name: 'Navigation', icon: MenuIcon },
      { name: 'Home', icon: HouseIcon },
      { name: 'Appearance', icon: PaintbrushIcon },
      { name: 'Messages & media', icon: MessageCircleIcon },
      { name: 'Language & region', icon: GlobeIcon },
      { name: 'Accessibility', icon: KeyboardIcon },
      { name: 'Mark as read', icon: CheckIcon },
      { name: 'Audio & video', icon: VideoIcon },
      { name: 'Connected accounts', icon: LinkIcon },
      { name: 'Privacy & visibility', icon: LockIcon },
      { name: 'Advanced', icon: SettingsIcon }
    ]
  };

  let open = $state(true);
</script>

<Dialog bind:open>
  <DialogTrigger class={cn(buttonVariants({ size: 'sm' }))}>Open Dialog</DialogTrigger>
  <DialogPopup class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
    <DialogTitle class="sr-only">Settings</DialogTitle>
    <DialogDescription class="sr-only">Customize your settings here.</DialogDescription>
    <SidebarProvider class="items-start">
      <Sidebar collapsible="none" class="hidden md:flex">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {#each data.nav as item (item.name)}
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={item.name === 'Messages & media'}>
                      {#snippet child({ props })}
                        <a href="##" {...props}>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      {/snippet}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                {/each}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main class="flex h-[480px] flex-1 flex-col overflow-hidden">
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="##">Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Messages & media</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          {#each Array.from({ length: 10 }) as _, i (i)}
            <div class="aspect-video max-w-3xl rounded-xl bg-muted/50"></div>
          {/each}
        </div>
      </main>
    </SidebarProvider>
  </DialogPopup>
</Dialog>

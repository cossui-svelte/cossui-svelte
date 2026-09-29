<script lang="ts" module>
  import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import BellIcon from '@lucide/svelte/icons/bell';
  import ChartLineIcon from '@lucide/svelte/icons/chart-line';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import CornerUpLeftIcon from '@lucide/svelte/icons/corner-up-left';
  import CornerUpRightIcon from '@lucide/svelte/icons/corner-up-right';
  import FileTextIcon from '@lucide/svelte/icons/file-text';
  import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
  import LinkIcon from '@lucide/svelte/icons/link';
  import Settings2Icon from '@lucide/svelte/icons/settings-2';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';

  const data = [
    [
      {
        label: 'Customize Page',
        icon: Settings2Icon
      },
      {
        label: 'Turn into wiki',
        icon: FileTextIcon
      }
    ],
    [
      {
        label: 'Copy Link',
        icon: LinkIcon
      },
      {
        label: 'Duplicate',
        icon: CopyIcon
      },
      {
        label: 'Move to',
        icon: CornerUpRightIcon
      },
      {
        label: 'Move to Trash',
        icon: Trash2Icon
      }
    ],
    [
      {
        label: 'Undo',
        icon: CornerUpLeftIcon
      },
      {
        label: 'View analytics',
        icon: ChartLineIcon
      },
      {
        label: 'Version History',
        icon: GalleryVerticalEndIcon
      },
      {
        label: 'Show delete pages',
        icon: TrashIcon
      },
      {
        label: 'Notifications',
        icon: BellIcon
      }
    ],
    [
      {
        label: 'Import',
        icon: ArrowUpIcon
      },
      {
        label: 'Export',
        icon: ArrowDownIcon
      }
    ]
  ];
</script>

<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import StarIcon from '@lucide/svelte/icons/star';
  import { untrack } from 'svelte';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '$lib/components/ui/sidebar';
  import { cn } from '$lib/utils';

  let open = $state(false);

  $effect(() => {
    untrack(() => {
      open = true;
    });
  });
</script>

<div class="flex items-center gap-2 text-sm">
  <div class="hidden font-medium text-muted-foreground md:inline-block">Edit Oct 08</div>
  <Button variant="ghost" size="icon" class="size-7">
    <StarIcon />
  </Button>
  <Popover bind:open>
    <PopoverTrigger
      class={cn(
        buttonVariants({ variant: 'ghost', size: 'icon' }),
        'size-7 data-popup-open:bg-accent'
      )}
    >
      <EllipsisIcon />
    </PopoverTrigger>
    <PopoverPopup class="w-56 overflow-hidden rounded-lg p-0" align="end">
      <Sidebar collapsible="none" class="bg-transparent">
        <SidebarContent>
          {#each data as group, index (index)}
            <SidebarGroup class="border-b last:border-none">
              <SidebarGroupContent class="gap-0">
                <SidebarMenu>
                  {#each group as item, index (index)}
                    <SidebarMenuItem>
                      <SidebarMenuButton class="hover:bg-accent hover:text-accent-foreground">
                        <item.icon /> <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  {/each}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          {/each}
        </SidebarContent>
      </Sidebar>
    </PopoverPopup>
  </Popover>
</div>

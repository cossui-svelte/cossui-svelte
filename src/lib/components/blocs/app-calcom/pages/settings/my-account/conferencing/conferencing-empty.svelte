<script lang="ts" module>
  export type ConferencingApp = {
    id: string;
    name: string;
    description: string;
    logo: string;
    alt: string;
    isDefault?: boolean;
  };

  export const initialConferencingApps: ConferencingApp[] = [
    {
      alt: 'Cal Video',
      description:
        'Cal Video is the in-house web-based video conferencing platform powered by Daily.co, which is minimalistic and lightweight, but has most of the features you need.',
      id: 'cal-video',
      isDefault: true,
      logo: 'https://app.cal.com/app-store/dailyvideo/icon.svg',
      name: 'Cal Video'
    },
    {
      alt: 'Google Meet',
      description:
        "Google Meet is Google's web-based video conferencing platform, designed to compete with major conferencing platforms.",
      id: 'google-meet',
      logo: 'https://app.cal.com/app-store/googlevideo/logo.webp',
      name: 'Google Meet'
    }
  ];
</script>

<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
  import VideoIcon from '@lucide/svelte/icons/video';
  import { untrack } from 'svelte';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';

  let {
    apps = initialConferencingApps,
    onAppsChange
  }: { apps?: ConferencingApp[]; onAppsChange?: (apps: ConferencingApp[]) => void } = $props();

  let localApps = $state<ConferencingApp[]>(untrack(() => apps));
  let removeDialogOpen = $state(false);
  let appToRemove = $state<ConferencingApp | null>(null);

  const currentApps = $derived(onAppsChange ? apps : localApps);

  function setApps(next: ConferencingApp[]) {
    if (onAppsChange) {
      onAppsChange(next);
    } else {
      localApps = next;
    }
  }

  function handleRemoveClick(app: ConferencingApp) {
    appToRemove = app;
    removeDialogOpen = true;
  }

  function handleRemoveConfirm() {
    if (!appToRemove) return;
    const id = appToRemove.id;
    setApps(currentApps.filter((a) => a.id !== id));
    removeDialogOpen = false;
    appToRemove = null;
  }

  function handleRemoveDialogOpenChange(open: boolean) {
    removeDialogOpen = open;
    if (!open) appToRemove = null;
  }
</script>

{#if currentApps.length === 0}
  <Empty class="rounded-xl border border-dashed py-8 md:py-12">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <VideoIcon />
      </EmptyMedia>
      <EmptyTitle>No conferencing apps</EmptyTitle>
      <EmptyDescription>
        Try adding a conference app for video calls with your clients
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button>Connect conference apps</Button>
    </EmptyContent>
  </Empty>
{:else}
  {#each currentApps as app (app.id)}
    <ListItem>
      <ListItemContent>
        <ListItemHeader>
          <div class="flex items-start gap-4">
            <img alt={app.alt} class="size-10 shrink-0" height="40" src={app.logo} width="40" />
            <div>
              <div class="flex items-center gap-2">
                <ListItemTitle>{app.name}</ListItemTitle>
                {#if app.isDefault}<Badge variant="success">Default</Badge>{/if}
              </div>
              <ListItemDescription>{app.description}</ListItemDescription>
            </div>
          </div>
        </ListItemHeader>
      </ListItemContent>
      <ListItemActions>
        <Menu>
          <Tooltip>
            <TooltipTrigger as="span" class="inline-flex">
              <MenuTrigger
                aria-label="Options"
                class={buttonVariants({ size: 'icon', variant: 'outline' })}
              >
                <EllipsisIcon />
              </MenuTrigger>
            </TooltipTrigger>
            <TooltipPopup>Options</TooltipPopup>
          </Tooltip>
          <MenuPopup align="end">
            <MenuItem disabled={app.isDefault}>
              <PencilIcon />
              Set as default
            </MenuItem>
            <MenuItem onclick={() => handleRemoveClick(app)} variant="destructive">
              <Trash2Icon />
              Remove app
            </MenuItem>
          </MenuPopup>
        </Menu>
      </ListItemActions>
    </ListItem>
  {/each}

  <AlertDialog bind:open={removeDialogOpen} onOpenChange={handleRemoveDialogOpenChange}>
    <AlertDialogPopup>
      <AlertDialogHeader>
        <AlertDialogTitle>Remove app</AlertDialogTitle>
        <AlertDialogDescription>Are you sure you want to remove this app?</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
        <AlertDialogClose
          class={buttonVariants({ variant: 'destructive' })}
          onclick={handleRemoveConfirm}
        >
          Remove app
        </AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialog>
{/if}

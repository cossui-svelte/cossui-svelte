<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import WebhookIcon from '@lucide/svelte/icons/webhook';
  import { untrack } from 'svelte';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuCheckboxItem,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemBadges,
    ListItemContent,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';
  import type { WebhookItem } from './webhooks-list-content.svelte';

  const EVENT_TAGS_VISIBLE = 8;

  let { webhook }: { webhook: WebhookItem } = $props();

  let enabled = $state(untrack(() => webhook.enabled ?? true));
  const visibleEvents = $derived(webhook.events.slice(0, EVENT_TAGS_VISIBLE));
  const remainingCount = $derived(webhook.events.length - EVENT_TAGS_VISIBLE);
</script>

<ListItem>
  <ListItemContent>
    <ListItemHeader>
      <div class="flex items-center gap-2">
        <ListItemTitle class="truncate font-normal">{webhook.url}</ListItemTitle>
        {#if webhook.date != null}
          <Badge variant="info">{webhook.date}</Badge>
        {/if}
      </div>
    </ListItemHeader>
    <ListItemBadges>
      {#each visibleEvents as event (event)}
        <Badge variant="outline">
          <WebhookIcon />
          {event}
        </Badge>
      {/each}
      {#if remainingCount > 0}
        <Badge variant="outline">+{remainingCount} More</Badge>
      {/if}
    </ListItemBadges>
  </ListItemContent>
  <ListItemActions>
    <div class="flex items-center gap-4 max-md:hidden">
      <Tooltip>
        <TooltipTrigger as="span" class="inline-flex">
          <Switch bind:checked={enabled} class="relative" />
        </TooltipTrigger>
        <TooltipPopup sideOffset={11}>
          {enabled ? 'Disable webhook' : 'Enable webhook'}
        </TooltipPopup>
      </Tooltip>

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
          <MenuItem>
            <PencilIcon />
            Edit
          </MenuItem>
          <MenuItem variant="destructive">
            <TrashIcon />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    </div>

    <Menu>
      <MenuTrigger
        aria-label="Options"
        class={buttonVariants({ class: 'md:hidden', size: 'icon', variant: 'outline' })}
      >
        <EllipsisIcon />
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem>
          <PencilIcon />
          Edit
        </MenuItem>
        <MenuSeparator />
        <MenuGroup>
          <MenuCheckboxItem bind:checked={enabled} variant="switch">Enable webhook</MenuCheckboxItem
          >
        </MenuGroup>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <TrashIcon />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  </ListItemActions>
</ListItem>

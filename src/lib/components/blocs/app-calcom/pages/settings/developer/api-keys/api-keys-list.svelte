<script lang="ts" module>
  export interface ApiKeyItem {
    id: string;
    note: string;
    key: string;
    expiresAt: string | null;
    createdAt: string;
    neverExpires: boolean;
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function isExpired(item: ApiKeyItem): boolean {
    if (item.neverExpires || !item.expiresAt) return false;
    return new Date(item.expiresAt) < new Date();
  }

  function getStatusLabel(item: ApiKeyItem): string {
    return isExpired(item) ? 'Expired' : 'Active';
  }

  function getStatusVariant(item: ApiKeyItem): 'success' | 'error' {
    return isExpired(item) ? 'error' : 'success';
  }

  function getExpirationDescription(item: ApiKeyItem): string {
    if (item.neverExpires) return 'Never expires';
    if (!item.expiresAt) return 'No expiration set';
    const expiresDate = new Date(item.expiresAt);
    const now = new Date();
    if (expiresDate < now) return `Expired ${formatDate(item.expiresAt)}`;
    return `Expires ${formatDate(item.expiresAt)}`;
  }
</script>

<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemBadges,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';

  let {
    apiKeys,
    onEditClick,
    onRemoveClick
  }: {
    apiKeys: ApiKeyItem[];
    onEditClick: (apiKey: ApiKeyItem) => void;
    onRemoveClick: (apiKey: ApiKeyItem) => void;
  } = $props();
</script>

{#each apiKeys as apiKey (apiKey.id)}
  <ListItem>
    <ListItemContent>
      <ListItemHeader>
        <ListItemTitle>{apiKey.note || 'Untitled API Key'}</ListItemTitle>
        <ListItemDescription>{getExpirationDescription(apiKey)}</ListItemDescription>
      </ListItemHeader>
    </ListItemContent>
    <ListItemBadges>
      <Badge class="pointer-events-none" variant={getStatusVariant(apiKey)}>
        {getStatusLabel(apiKey)}
      </Badge>
    </ListItemBadges>
    <ListItemActions>
      <Menu>
        <Tooltip>
          <TooltipTrigger as="span" class="inline-flex">
            <MenuTrigger
              aria-label={`Options for ${apiKey.note || 'API key'}`}
              class={buttonVariants({ size: 'icon', variant: 'outline' })}
            >
              <EllipsisIcon />
            </MenuTrigger>
          </TooltipTrigger>
          <TooltipPopup>Options</TooltipPopup>
        </Tooltip>
        <MenuPopup align="end">
          <MenuItem onclick={() => onEditClick(apiKey)}>
            <PencilIcon />
            Edit
          </MenuItem>
          <MenuItem onclick={() => onRemoveClick(apiKey)} variant="destructive">
            <Trash2Icon />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    </ListItemActions>
  </ListItem>
{/each}

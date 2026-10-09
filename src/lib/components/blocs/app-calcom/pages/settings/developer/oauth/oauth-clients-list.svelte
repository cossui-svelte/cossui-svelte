<script lang="ts" module>
  export interface OAuthClientItem {
    id: string;
    name: string;
    status: 'pending' | 'approved' | 'rejected';
    clientId: string;
    clientSecret: string;
    purpose?: string;
    redirectUri?: string;
    websiteUrl?: string;
    usePkce?: boolean;
    logo?: string;
  }

  export const statusVariantMap = {
    approved: 'success',
    pending: 'warning',
    rejected: 'error'
  } as const;

  export const statusLabelMap = {
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected'
  } as const;
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
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';

  let {
    clients,
    onEditClick,
    onRemoveClick
  }: {
    clients: OAuthClientItem[];
    onEditClick: (client: OAuthClientItem) => void;
    onRemoveClick: (client: OAuthClientItem) => void;
  } = $props();
</script>

{#each clients as client (client.id)}
  <ListItem>
    <ListItemContent>
      <ListItemHeader>
        <ListItemTitle>{client.name}</ListItemTitle>
      </ListItemHeader>
    </ListItemContent>
    <ListItemBadges>
      <Badge class="pointer-events-none" variant={statusVariantMap[client.status]}>
        {statusLabelMap[client.status]}
      </Badge>
    </ListItemBadges>
    <ListItemActions>
      <Menu>
        <Tooltip>
          <TooltipTrigger as="span" class="inline-flex">
            <MenuTrigger
              aria-label={`Options for ${client.name}`}
              class={buttonVariants({ size: 'icon', variant: 'outline' })}
            >
              <EllipsisIcon />
            </MenuTrigger>
          </TooltipTrigger>
          <TooltipPopup>Options</TooltipPopup>
        </Tooltip>
        <MenuPopup align="end">
          <MenuItem onclick={() => onEditClick(client)}>
            <PencilIcon />
            Edit
          </MenuItem>
          <MenuItem onclick={() => onRemoveClick(client)} variant="destructive">
            <Trash2Icon />
            Remove
          </MenuItem>
        </MenuPopup>
      </Menu>
    </ListItemActions>
  </ListItem>
{/each}

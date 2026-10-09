<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import InfoIcon from '@lucide/svelte/icons/info';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import TrashIcon from '@lucide/svelte/icons/trash';
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
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemBadges,
    ListItemContent,
    ListItemHeader,
    ListItemSpanningTrigger,
    ListItemTitle
  } from '../../../../components/list-item/index.js';
  import type { DelegationCredentialItem } from './delegation-credential-types.js';

  let {
    credentials,
    enabledById,
    onEditRequest,
    onEnabledChange,
    onRemoveRequest
  }: {
    credentials: DelegationCredentialItem[];
    enabledById: Record<string, boolean>;
    onEditRequest: (item: DelegationCredentialItem) => void;
    onEnabledChange: (id: string, checked: boolean) => void;
    onRemoveRequest: (item: DelegationCredentialItem) => void;
  } = $props();
</script>

{#each credentials as credential (credential.id)}
  <ListItem>
    <ListItemContent>
      <ListItemHeader>
        <div class="flex flex-col gap-2">
          <div class="flex min-w-0 items-center gap-1.5">
            <ListItemTitle class="min-w-0 truncate font-semibold sm:text-sm">
              <ListItemSpanningTrigger>
                {#snippet child({ props })}
                  <button {...props} onclick={() => onEditRequest(credential)} type="button">
                    {credential.subjectId}
                  </button>
                {/snippet}
              </ListItemSpanningTrigger>
            </ListItemTitle>
            <Popover>
              <PopoverTrigger
                aria-label="About Client Id"
                class="relative"
                closeDelay={100}
                delay={0}
                openOnHover
              >
                <InfoIcon class="size-3.5 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverPopup class="max-w-52 text-center" side="top" tooltipStyle>
                <p>Add this Client Id in Google Workspace with the scope below</p>
              </PopoverPopup>
            </Popover>
          </div>
          <p class="line-clamp-2 break-all text-muted-foreground text-sm">
            {credential.scopeUrl}
          </p>
          <ListItemBadges>
            <Badge class="pointer-events-none" variant="warning">
              {credential.platformLabel}
            </Badge>
            <Badge class="pointer-events-none" variant="outline">
              {credential.domain}
            </Badge>
          </ListItemBadges>
        </div>
      </ListItemHeader>
    </ListItemContent>

    <ListItemActions class="max-md:hidden">
      <Switch
        checked={enabledById[credential.id] ?? true}
        class="relative"
        onCheckedChange={(checked: boolean) => onEnabledChange(credential.id, checked)}
      />
      <Menu>
        <MenuTrigger
          aria-label="Delegation credential options"
          class={buttonVariants({ size: 'icon', variant: 'outline' })}
          type="button"
        >
          <EllipsisIcon aria-hidden="true" />
        </MenuTrigger>
        <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
          <MenuItem onclick={() => onEditRequest(credential)}>
            <PencilIcon aria-hidden="true" />
            Edit
          </MenuItem>
          <MenuItem onclick={() => onRemoveRequest(credential)} variant="destructive">
            <TrashIcon aria-hidden="true" />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    </ListItemActions>

    <Menu>
      <MenuTrigger
        aria-label="Delegation credential options"
        class={buttonVariants({ size: 'icon', variant: 'outline', class: 'md:hidden' })}
        type="button"
      >
        <EllipsisIcon aria-hidden="true" />
      </MenuTrigger>
      <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
        <MenuItem onclick={() => onEditRequest(credential)}>
          <PencilIcon aria-hidden="true" />
          Edit
        </MenuItem>
        <MenuSeparator />
        <MenuGroup>
          <MenuCheckboxItem
            checked={enabledById[credential.id] ?? true}
            onCheckedChange={(checked: boolean) => onEnabledChange(credential.id, checked)}
            variant="switch"
          >
            Enabled
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem onclick={() => onRemoveRequest(credential)} variant="destructive">
          <TrashIcon aria-hidden="true" />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  </ListItem>
{/each}

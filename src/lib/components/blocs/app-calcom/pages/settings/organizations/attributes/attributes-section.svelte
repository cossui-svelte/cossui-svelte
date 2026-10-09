<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import TagIcon from '@lucide/svelte/icons/tag';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameAction,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import {
    Menu,
    MenuCheckboxItem,
    MenuGroup,
    MenuLinkItem,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemSpanningTrigger,
    ListItemTitle
  } from '../../../../components/list-item/index.js';
  import { href } from '../../../../lib/router.svelte.js';
  import type { AttributeItem } from './attribute-types.js';

  let { attributes }: { attributes: AttributeItem[] } = $props();

  let removedIds = $state<string[]>([]);
  let removeDialogOpen = $state(false);
  let attributeToRemove = $state<AttributeItem | null>(null);

  const visibleAttributes = $derived(attributes.filter((a) => !removedIds.includes(a.id)));

  // svelte-ignore state_referenced_locally
  let enabledById = $state<Record<string, boolean>>(
    Object.fromEntries(attributes.map((a) => [a.id, a.enabled ?? true]))
  );

  function handleRemoveDialogOpenChangeComplete(open: boolean) {
    if (!open) {
      attributeToRemove = null;
    }
  }

  function requestRemove(attribute: AttributeItem) {
    attributeToRemove = attribute;
    removeDialogOpen = true;
  }

  function handleRemoveConfirm() {
    if (!attributeToRemove) return;
    removedIds = [...removedIds, attributeToRemove.id];
    removeDialogOpen = false;
  }

  function handleEnabledChange(attributeId: string, checked: boolean) {
    enabledById = { ...enabledById, [attributeId]: checked };
    toastManager.add({ title: 'Attribute updated successfully', type: 'success' });
  }
</script>

{#if visibleAttributes.length === 0}
  <Empty class="rounded-xl border border-dashed py-8 md:py-12">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <TagIcon />
      </EmptyMedia>
      <EmptyTitle>Add attributes</EmptyTitle>
      <EmptyDescription>Add attributes to your team members</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button href={href('/settings/organizations/attributes/new')}>
        <PlusIcon aria-hidden="true" />
        New attribute
      </Button>
    </EmptyContent>
  </Empty>
{:else}
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Custom</CardFrameTitle>
      <CardFrameAction>
        <Button href={href('/settings/organizations/attributes/new')} variant="outline">
          <PlusIcon aria-hidden="true" />
          Add
        </Button>
      </CardFrameAction>
    </CardFrameHeader>
    <Card class="rounded-b-none!">
      <CardPanel class="p-0">
        {#each visibleAttributes as attribute (attribute.id)}
          {@const editHref = href(
            `/settings/organizations/attributes/${encodeURIComponent(attribute.id)}/edit`
          )}
          <ListItem>
            <ListItemContent>
              <ListItemHeader>
                <ListItemTitle class="truncate">
                  <ListItemSpanningTrigger>
                    {#snippet child({ props })}
                      <a {...props} href={editHref}>{attribute.name}</a>
                    {/snippet}
                  </ListItemSpanningTrigger>
                </ListItemTitle>
                <ListItemDescription class="line-clamp-2">
                  {attribute.details}
                </ListItemDescription>
              </ListItemHeader>
            </ListItemContent>

            <div class="flex items-center gap-4 max-md:hidden">
              <Switch
                class="relative"
                checked={enabledById[attribute.id] ?? true}
                onCheckedChange={(checked: boolean) => handleEnabledChange(attribute.id, checked)}
              />
              <Menu>
                <MenuTrigger
                  aria-label="Attribute options"
                  class={buttonVariants({ size: 'icon', variant: 'outline' })}
                  type="button"
                >
                  <EllipsisIcon aria-hidden="true" />
                </MenuTrigger>
                <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
                  <MenuLinkItem href={editHref}>
                    <PencilIcon aria-hidden="true" />
                    Edit
                  </MenuLinkItem>
                  <MenuItem onclick={() => requestRemove(attribute)} variant="destructive">
                    <TrashIcon aria-hidden="true" />
                    Delete
                  </MenuItem>
                </MenuPopup>
              </Menu>
            </div>

            <Menu>
              <MenuTrigger
                aria-label="Attribute options"
                class={buttonVariants({ size: 'icon', variant: 'outline', class: 'md:hidden' })}
                type="button"
              >
                <EllipsisIcon aria-hidden="true" />
              </MenuTrigger>
              <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
                <MenuLinkItem href={editHref}>
                  <PencilIcon aria-hidden="true" />
                  Edit
                </MenuLinkItem>
                <MenuSeparator />
                <MenuGroup>
                  <MenuCheckboxItem
                    checked={enabledById[attribute.id] ?? true}
                    onCheckedChange={(checked: boolean) =>
                      handleEnabledChange(attribute.id, checked)}
                    variant="switch"
                  >
                    Enabled
                  </MenuCheckboxItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuItem onclick={() => requestRemove(attribute)} variant="destructive">
                  <TrashIcon aria-hidden="true" />
                  Delete
                </MenuItem>
              </MenuPopup>
            </Menu>
          </ListItem>
        {/each}
      </CardPanel>
    </Card>
  </CardFrame>

  <AlertDialog
    bind:open={removeDialogOpen}
    onOpenChangeComplete={handleRemoveDialogOpenChangeComplete}
  >
    <AlertDialogPopup>
      <AlertDialogHeader>
        <AlertDialogTitle>Remove attribute</AlertDialogTitle>
        <AlertDialogDescription>
          {attributeToRemove
            ? `Are you sure you want to remove the attribute '${attributeToRemove.name}'? All users currently assigned to it will be unassigned.`
            : null}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
        <AlertDialogClose
          class={buttonVariants({ variant: 'destructive' })}
          onclick={handleRemoveConfirm}
        >
          Remove attribute
        </AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialog>
{/if}

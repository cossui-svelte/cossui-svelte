<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle
  } from '#lib/components/ui/drawer/index.js';
  import { ToggleGroup, ToggleGroupItem } from '#lib/components/ui/toggle-group/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import {
    ListItem,
    ListItemContent,
    ListItemHeader,
    ListItemTitle
  } from '../../../../../components/list-item/index.js';
  import PermissionGrantList from './permission-grant-list.svelte';
  import {
    DEFAULT_ROLES,
    defaultGrantSelection,
    defaultPermissionLevels,
    grantsForMode,
    PERMISSION_DETAILS,
    PERMISSION_ROWS,
    type PermissionLevel,
    type RowId
  } from './permissions-data.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  let drawerOpen = $state(false);
  let levels = $state(defaultPermissionLevels());
  let grantSelection = $state(defaultGrantSelection());
  let rowExpanded = $state<Partial<Record<RowId, boolean>>>({});

  function handleLevelChange(rowId: RowId, values: readonly string[]) {
    const next = values[0] as PermissionLevel | undefined;
    if (!next) return;

    const prevMode = levels[rowId];
    const snapshot = grantSelection[rowId];
    let nextIds: string[];
    if (next === 'custom') {
      nextIds = grantsForMode(rowId, prevMode, snapshot);
    } else if (next === 'none') {
      nextIds = [];
    } else if (next === 'read') {
      nextIds = [PERMISSION_DETAILS[rowId].viewGrantId];
    } else {
      nextIds = PERMISSION_DETAILS[rowId].grants.map((g) => g.id);
    }
    grantSelection = { ...grantSelection, [rowId]: nextIds };
    levels = { ...levels, [rowId]: next };

    if (next === 'custom') {
      rowExpanded = { ...rowExpanded, [rowId]: true };
    }
  }

  function handleGrantToggle(rowId: RowId, grantId: string, checked: boolean) {
    const current = new Set(grantSelection[rowId]);
    if (checked) current.add(grantId);
    else current.delete(grantId);
    grantSelection = { ...grantSelection, [rowId]: [...current] };
  }
</script>

<AppHeader>
  <AppHeaderContent title="Roles & permissions">
    <AppHeaderDescription>Manage roles and permissions for your organization</AppHeaderDescription>
  </AppHeaderContent>
  <AppHeaderActions>
    <Button class="rounded-lg" onclick={() => (drawerOpen = true)} type="button">
      <PlusIcon aria-hidden="true" />
      Create role
    </Button>
  </AppHeaderActions>
</AppHeader>

<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Default roles</CardFrameTitle>
  </CardFrameHeader>
  <Card>
    <CardPanel class="p-0">
      {#each DEFAULT_ROLES as role (role.title)}
        <ListItem>
          <ListItemContent>
            <ListItemHeader class="flex-row items-center gap-3">
              <span aria-hidden="true" class={`size-2.5 shrink-0 rounded-full ${role.dotClass}`}
              ></span>
              <ListItemTitle>{role.title}</ListItemTitle>
            </ListItemHeader>
          </ListItemContent>
        </ListItem>
      {/each}
    </CardPanel>
  </Card>
</CardFrame>

<Drawer bind:open={drawerOpen} position="right">
  <DrawerPopup class="max-w-lg" position="right" variant="inset">
    <DrawerHeader class="pb-3">
      <DrawerTitle>Create role</DrawerTitle>
    </DrawerHeader>
    <DrawerPanel>
      <CardFrame class="w-full">
        <CardFrameHeader class="px-4">
          <CardFrameTitle>Permissions</CardFrameTitle>
        </CardFrameHeader>
        <Card>
          <CardPanel class="p-0">
            {#each PERMISSION_ROWS as row (row.id)}
              <ListItem class="*:px-4 *:pt-3 *:pb-0">
                <ListItemContent class="w-full min-w-0">
                  <Collapsible
                    open={rowExpanded[row.id] ?? false}
                    onOpenChange={(open: boolean) =>
                      (rowExpanded = { ...rowExpanded, [row.id]: open })}
                  >
                    <div class="flex w-full flex-col">
                      <div
                        class="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <CollapsibleTrigger class="flex items-center gap-1.5 font-medium text-sm">
                          <ChevronDownIcon
                            aria-hidden="true"
                            class="size-4 shrink-0 in-data-panel-open:rotate-180 opacity-80 transition-transform"
                          />
                          {row.label}
                        </CollapsibleTrigger>
                        <ToggleGroup
                          onValueChange={(values: string[]) => handleLevelChange(row.id, values)}
                          size="sm"
                          value={[levels[row.id]]}
                        >
                          <ToggleGroupItem
                            aria-label="None"
                            class="font-normal text-muted-foreground"
                            value="none"
                          >
                            None
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            aria-label="Read"
                            class="font-normal text-muted-foreground"
                            value="read"
                          >
                            Read
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            aria-label="All"
                            class="font-normal text-muted-foreground"
                            value="all"
                          >
                            All
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            aria-label="Custom"
                            class="font-normal text-muted-foreground"
                            value="custom"
                          >
                            Custom
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                      <CollapsiblePanel>
                        <div class="mb-4 rounded-lg bg-muted/72 p-3">
                          <PermissionGrantList
                            disabled={levels[row.id] !== 'custom'}
                            grantIds={grantSelection[row.id] ?? []}
                            onGrantChange={(grantId, checked) =>
                              handleGrantToggle(row.id, grantId, checked)}
                            rowId={row.id}
                          />
                        </div>
                      </CollapsiblePanel>
                    </div>
                  </Collapsible>
                </ListItemContent>
              </ListItem>
            {/each}
          </CardPanel>
        </Card>
      </CardFrame>
    </DrawerPanel>
    <DrawerFooter>
      <DrawerClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DrawerClose>
      <Button onclick={() => (drawerOpen = false)} type="button" variant="default">Create</Button>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>

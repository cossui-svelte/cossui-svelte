<script lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import FunnelIcon from '@lucide/svelte/icons/funnel';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SlidersHorizontalIcon from '@lucide/svelte/icons/sliders-horizontal';
  import UserPlusIcon from '@lucide/svelte/icons/user-plus';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { CardFrame } from '#lib/components/ui/card/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue
  } from '#lib/components/ui/combobox/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '#lib/components/ui/table/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  type TeamRole = 'MEMBER' | 'OWNER';
  type RoleFilter = 'all' | TeamRole;
  type ColumnId = 'role' | 'lastActive';
  type SortColumn = 'name' | 'role' | 'lastActive';

  const COLUMN_TOGGLE_ITEMS: { label: string; value: ColumnId }[] = [
    { label: 'Role', value: 'role' },
    { label: 'Last Active', value: 'lastActive' }
  ];

  const ROLE_FILTER_ITEMS: { label: string; value: RoleFilter }[] = [
    { label: 'All members', value: 'all' },
    { label: 'Owners', value: 'OWNER' },
    { label: 'Members', value: 'MEMBER' }
  ];

  type TeamMember = {
    id: string;
    name: string;
    email: string;
    role: TeamRole;
    lastActive: string;
    avatarUrl?: string;
    hasOptions?: boolean;
  };

  const members: TeamMember[] = [
    {
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&q=80',
      email: 'teampro@example.com',
      id: 'team-pro-example',
      lastActive: 'Active now',
      name: 'Team Pro Example',
      role: 'OWNER'
    },
    {
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&q=80',
      email: 'teamfree@example.com',
      id: 'team-free-example',
      lastActive: '2 days ago',
      name: 'Team Free Example',
      role: 'OWNER'
    },
    {
      avatarUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&q=80',
      email: 'teampro2@example.com',
      id: 'team-pro-example-2',
      lastActive: '1 week ago',
      name: 'Team Pro Example 2',
      role: 'MEMBER'
    },
    {
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&q=80',
      email: 'teampro3@example.com',
      hasOptions: false,
      id: 'team-pro-example-3',
      lastActive: '3 hours ago',
      name: 'Team Pro Example 3',
      role: 'OWNER'
    },
    {
      avatarUrl:
        'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=128&h=128&fit=crop&q=80',
      email: 'teampro4@example.com',
      id: 'team-pro-example-4',
      lastActive: 'Just now',
      name: 'Team Pro Example 4',
      role: 'OWNER'
    }
  ];

  const ROLE_LABEL: Record<TeamRole, string> = {
    MEMBER: 'Member',
    OWNER: 'Owner'
  };

  function shouldIgnoreRowSelectionClick(target: EventTarget | null): boolean {
    return (
      target instanceof Element &&
      target.closest(
        'a, button, input, select, textarea, [role="button"], [role="checkbox"], [data-slot="checkbox"], [data-slot="label"]'
      ) !== null
    );
  }

  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() ?? '';
    return `${parts[0]?.charAt(0) ?? ''}${parts.at(-1)?.charAt(0) ?? ''}`.toUpperCase();
  }

  let roleFilter = $state<RoleFilter>('all');
  let searchValue = $state('');
  let showRoleColumn = $state(true);
  let showLastActiveColumn = $state(true);
  let sorting = $state<{ id: SortColumn; desc: boolean }>({ desc: false, id: 'name' });
  let selectedIds = $state<string[]>([]);

  const filteredMembers = $derived.by(() => {
    const query = searchValue.trim().toLowerCase();
    return members.filter((member) => {
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesQuery =
        query.length === 0 ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query);
      return matchesRole && matchesQuery;
    });
  });

  const sortedMembers = $derived.by(() => {
    const { id, desc } = sorting;
    const sorted = [...filteredMembers].sort((a, b) =>
      String(a[id]).localeCompare(String(b[id]), undefined, { numeric: true })
    );
    return desc ? sorted.reverse() : sorted;
  });

  const columnToggleValue = $derived([
    ...(showRoleColumn ? ['role'] : []),
    ...(showLastActiveColumn ? ['lastActive'] : [])
  ]);

  const visibleColumnCount = $derived(
    3 + (showRoleColumn ? 1 : 0) + (showLastActiveColumn ? 1 : 0)
  );

  const allSelected = $derived(
    sortedMembers.length > 0 && sortedMembers.every((m) => selectedIds.includes(m.id))
  );
  const someSelected = $derived(sortedMembers.some((m) => selectedIds.includes(m.id)));

  // Drop sorting on hidden columns, falling back to name ascending.
  $effect(() => {
    if (
      (!showRoleColumn && sorting.id === 'role') ||
      (!showLastActiveColumn && sorting.id === 'lastActive')
    ) {
      sorting = { desc: false, id: 'name' };
    }
  });

  function toggleSorting(id: SortColumn) {
    sorting = sorting.id === id ? { desc: !sorting.desc, id } : { desc: false, id };
  }

  function toggleRow(id: string, selected?: boolean) {
    const isSelected = selected ?? !selectedIds.includes(id);
    selectedIds = isSelected
      ? selectedIds.includes(id)
        ? selectedIds
        : [...selectedIds, id]
      : selectedIds.filter((x) => x !== id);
  }

  function toggleAll(selected: boolean) {
    const ids = sortedMembers.map((m) => m.id);
    selectedIds = selected
      ? [...new Set([...selectedIds, ...ids])]
      : selectedIds.filter((id) => !ids.includes(id));
  }
</script>

{#snippet sortHeader(id: SortColumn, label: string, width: number)}
  <TableHead class={id === 'name' ? 'sm:w-auto!' : undefined} style={`width: ${width}px`}>
    <div
      class="flex h-full cursor-pointer select-none items-center justify-between gap-2"
      onclick={() => toggleSorting(id)}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleSorting(id);
        }
      }}
      role="button"
      tabindex={0}
    >
      {label}
      {#if sorting.id === id}
        {#if sorting.desc}
          <ChevronDownIcon aria-hidden="true" class="size-4 shrink-0 opacity-80" />
        {:else}
          <ChevronUpIcon aria-hidden="true" class="size-4 shrink-0 opacity-80" />
        {/if}
      {/if}
    </div>
  </TableHead>
{/snippet}

<AppHeader>
  <AppHeaderContent title="Team members">
    <AppHeaderDescription>Users that are in the group</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>

<div class="mt-6 flex flex-col gap-4">
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-1 flex-wrap items-center gap-2">
      <InputGroup class="w-full sm:max-w-52">
        <InputGroupInput
          aria-label="Search members"
          bind:value={searchValue}
          placeholder="Search"
          type="search"
        />
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>

      <Combobox
        autoHighlight
        items={COLUMN_TOGGLE_ITEMS}
        multiple
        value={columnToggleValue}
        onValueChange={(next: string[] | null) => {
          const values = next ?? [];
          showRoleColumn = values.includes('role');
          showLastActiveColumn = values.includes('lastActive');
        }}
      >
        <ComboboxTrigger aria-label="Display" class={buttonVariants({ variant: 'outline' })}>
          <SlidersHorizontalIcon aria-hidden="true" />
          Display
        </ComboboxTrigger>
        <ComboboxPopup align="start" aria-label="Toggle columns">
          <div class="border-b p-2">
            <ComboboxInput placeholder="Search" showTrigger={false} size="sm">
              {#snippet startAddon()}
                <SearchIcon aria-hidden="true" />
              {/snippet}
            </ComboboxInput>
          </div>
          <ComboboxEmpty>No columns found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup items={COLUMN_TOGGLE_ITEMS}>
              <ComboboxGroupLabel>Toggle columns</ComboboxGroupLabel>
              <ComboboxCollection>
                {#snippet children(item: { label: string; value: string })}
                  <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
                {/snippet}
              </ComboboxCollection>
            </ComboboxGroup>
          </ComboboxList>
          <div class="border-t p-2">
            <Button
              class="w-full"
              onclick={() => {
                showRoleColumn = true;
                showLastActiveColumn = true;
              }}
              size="sm"
              variant="outline"
            >
              Show all columns
            </Button>
          </div>
        </ComboboxPopup>
      </Combobox>

      <Combobox
        items={ROLE_FILTER_ITEMS}
        value={roleFilter}
        onValueChange={(item: string | null) => item && (roleFilter = item as RoleFilter)}
      >
        <ComboboxTrigger class={buttonVariants({ variant: 'outline' })}>
          <FunnelIcon aria-hidden="true" />
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxPopup align="start" aria-label="Filter by role">
          <ComboboxEmpty>No roles found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup items={ROLE_FILTER_ITEMS}>
              <ComboboxGroupLabel>Role</ComboboxGroupLabel>
              <ComboboxCollection>
                {#snippet children(item: { label: string; value: string })}
                  <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
                {/snippet}
              </ComboboxCollection>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>

    <Button>
      <PlusIcon aria-hidden="true" />
      Add
    </Button>
  </div>

  <CardFrame class="w-full">
    <Table class="table-fixed" variant="card">
      <TableHeader>
        <TableRow>
          <TableHead style="width: 28px">
            <Checkbox
              aria-label="Select all"
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onCheckedChange={(value: boolean) => toggleAll(!!value)}
            />
          </TableHead>
          {@render sortHeader('name', 'Member', 240)}
          {#if showRoleColumn}
            {@render sortHeader('role', 'Role', 80)}
          {/if}
          {#if showLastActiveColumn}
            {@render sortHeader('lastActive', 'Last Active', 100)}
          {/if}
          <TableHead style="width: 80px"><span class="sr-only">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each sortedMembers as member (member.id)}
          <TableRow
            data-state={selectedIds.includes(member.id) ? 'selected' : undefined}
            onclick={(event: MouseEvent) => {
              if (shouldIgnoreRowSelectionClick(event.target)) return;
              toggleRow(member.id);
            }}
          >
            <TableCell>
              <Label>
                <Checkbox
                  aria-label={`Select ${member.name}`}
                  checked={selectedIds.includes(member.id)}
                  onCheckedChange={(value: boolean) => toggleRow(member.id, !!value)}
                />
              </Label>
            </TableCell>
            <TableCell>
              <div class="flex min-w-0 items-center gap-3">
                <Avatar class="size-8 shrink-0">
                  {#if member.avatarUrl}
                    <AvatarImage alt={member.name} src={member.avatarUrl} />
                  {/if}
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div class="min-w-0">
                  <div class="truncate font-medium text-sm">{member.name}</div>
                  <div class="truncate text-muted-foreground text-sm">{member.email}</div>
                </div>
              </div>
            </TableCell>
            {#if showRoleColumn}
              <TableCell>
                <Badge variant={member.role === 'OWNER' ? 'info' : 'secondary'}>
                  {ROLE_LABEL[member.role]}
                </Badge>
              </TableCell>
            {/if}
            {#if showLastActiveColumn}
              <TableCell>
                <span class="text-muted-foreground text-sm">{member.lastActive}</span>
              </TableCell>
            {/if}
            <TableCell>
              <div class="flex justify-end">
                {#if member.hasOptions === false}
                  <Button aria-label={`Open ${member.name}`} size="icon-sm" variant="outline">
                    <ArrowUpRightIcon aria-hidden="true" />
                  </Button>
                {:else}
                  <Group class="shrink-0">
                    <Button aria-label={`Open ${member.name}`} size="icon-sm" variant="outline">
                      <ArrowUpRightIcon aria-hidden="true" />
                    </Button>
                    <GroupSeparator />
                    <Menu>
                      <MenuTrigger
                        aria-label={`Options for ${member.name}`}
                        class={buttonVariants({ size: 'icon-sm', variant: 'outline' })}
                      >
                        <EllipsisIcon aria-hidden="true" />
                      </MenuTrigger>
                      <MenuPopup align="end">
                        <MenuGroup>
                          <MenuGroupLabel>Member</MenuGroupLabel>
                          <MenuItem>
                            <ArrowUpRightIcon aria-hidden="true" />
                            View profile
                          </MenuItem>
                          <MenuItem>
                            <UserPlusIcon aria-hidden="true" />
                            Copy invite link
                          </MenuItem>
                        </MenuGroup>
                        <MenuSeparator />
                        <MenuGroup>
                          <MenuGroupLabel>Permissions</MenuGroupLabel>
                          <MenuItem>Change role</MenuItem>
                          <MenuItem variant="destructive">Remove from team</MenuItem>
                        </MenuGroup>
                      </MenuPopup>
                    </Menu>
                  </Group>
                {/if}
              </div>
            </TableCell>
          </TableRow>
        {:else}
          <TableRow>
            <TableCell class="h-24 text-center" colspan={visibleColumnCount}>
              No members found.
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </CardFrame>
</div>

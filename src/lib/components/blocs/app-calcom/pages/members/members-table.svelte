<script lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import {
    createTable,
    createTableState,
    FlexRender,
    type SortingState
  } from '@tanstack/svelte-table';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { CardFrame, CardFrameFooter } from '#lib/components/ui/card/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '#lib/components/ui/table/index.js';
  import BadgeList from './badge-list.svelte';
  import { type ColumnKey, getInitials, type Member } from './members-data.js';
  import OptionalBadge from './optional-badge.svelte';
  import RoleBadge from './role-badge.svelte';
  import {
    features,
    getColumnDisplayWidth,
    getColumns,
    getFillerColumnId,
    getPinnedDataAttribute,
    getPinningStyles,
    INITIAL_COLUMN_PINNING,
    shouldIgnoreRowSelectionClick
  } from './table-utils.js';

  let {
    data,
    columnVisibility
  }: {
    data: Member[];
    columnVisibility: Record<ColumnKey, boolean>;
  } = $props();

  let tableContainer = $state<HTMLElement | null>(null);
  let containerWidth = $state(0);

  const [sorting, setSorting] = createTableState<SortingState>([{ desc: false, id: 'name' }]);

  const columns = $derived(getColumns(columnVisibility));

  // Drop sorting on columns that were hidden; fall back to the name column.
  $effect(() => {
    const hiddenIds = (Object.entries(columnVisibility) as [ColumnKey, boolean][])
      .filter(([, visible]) => !visible)
      .map(([id]) => id as string);
    setSorting((previous) => {
      const next = previous.filter((s) => !hiddenIds.includes(s.id));
      return next.length > 0 ? next : [{ desc: false, id: 'name' }];
    });
  });

  $effect(() => {
    const node = tableContainer;
    if (!node) return;

    const updateWidth = (): void => {
      containerWidth = node.clientWidth;
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  });

  const table = createTable({
    columnResizeMode: 'onChange',
    get columns() {
      return columns;
    },
    get data() {
      return data;
    },
    enableRowSelection: true,
    enableSortingRemoval: false,
    features,
    getRowId: (row: Member) => row.id,
    initialState: {
      columnPinning: INITIAL_COLUMN_PINNING
    },
    onSortingChange: setSorting,
    state: {
      get sorting() {
        return sorting();
      }
    }
  });

  const headerGroups = $derived(table.getHeaderGroups());
  const headers = $derived(headerGroups[0]?.headers ?? []);
  const columnsTotalSize = $derived(table.getCenterTotalSize());
  const tableWidth = $derived(
    containerWidth > 0 ? Math.max(containerWidth + 2, columnsTotalSize) : columnsTotalSize
  );
  const fillerColumnId = $derived(getFillerColumnId(headers));
  const rows = $derived(table.getRowModel().rows);
  const selectedCount = $derived(table.getFilteredSelectedRowModel().rows.length);
  const totalCount = $derived(table.getFilteredRowModel().rows.length);

  function widthStyle(
    column: { id: string; getSize: () => number },
    pinningStyles: string
  ): string {
    const width = getColumnDisplayWidth({
      columnId: column.id,
      columnsTotalSize,
      fillerColumnId,
      headers,
      size: column.getSize(),
      tableWidth
    });
    return `${pinningStyles};width:${width}px`;
  }
</script>

<CardFrame
  class="w-full before:bg-[color-mix(in_srgb,var(--color-black)_3%,var(--background))] dark:before:bg-[color-mix(in_srgb,var(--color-white)_4.6%,var(--background))]"
  bind:ref={tableContainer}
>
  <Table
    class="table-fixed [--border:color-mix(in_srgb,var(--color-black)_8%,color-mix(in_srgb,var(--color-black)_3%,var(--background)))] dark:[--border:color-mix(in_srgb,var(--color-white)_6%,color-mix(in_srgb,var(--color-white)_4.6%,var(--background)))]"
    variant="card"
  >
    <TableHeader>
      {#each headerGroups as headerGroup (headerGroup.id)}
        <TableRow>
          {#each headerGroup.headers as header (header.id)}
            {@const sorted = header.column.getIsSorted()}
            <TableHead
              aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'}
              class="relative z-1 select-none bg-[color-mix(in_srgb,var(--color-black)_3%,var(--background))] before:pointer-events-none before:absolute before:inset-y-0 before:z-1 not-data-pinned:before:hidden before:w-4 before:from-[color-mix(in_srgb,var(--color-black)_3%,var(--background))] before:to-transparent data-[pinned=start]:before:start-full data-[pinned=end]:before:end-full in-data-overflow-x-end:data-[pinned=end]:before:bg-linear-to-l last:*:data-[slot=column-resize-handle]:opacity-0 data-[pinned=start]:max-md:before:hidden data-[pinned=start]:md:sticky data-[pinned=start]:md:start-(--pinned-start-offset) in-data-overflow-x-start:data-[pinned=start]:md:before:bg-linear-to-r dark:bg-[color-mix(in_srgb,var(--color-white)_4.6%,var(--background))] dark:before:from-[color-mix(in_srgb,var(--color-white)_4.6%,var(--background))]"
              colspan={header.colSpan}
              style={widthStyle(header.column, getPinningStyles(header.column))}
              {...getPinnedDataAttribute(header.column)}
            >
              {#if header.isPlaceholder}
                <!-- placeholder -->
              {:else if header.column.id === 'select'}
                <Checkbox
                  aria-label="Select all"
                  checked={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                />
              {:else if header.column.id === 'actions'}
                <span class="sr-only">Actions</span>
              {:else if header.column.getCanSort()}
                <div
                  class="flex h-full cursor-pointer select-none items-center justify-between gap-2"
                  onclick={header.column.getToggleSortingHandler()}
                  onkeydown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      header.column.getToggleSortingHandler()?.(event);
                    }
                  }}
                  role="button"
                  tabindex={0}
                >
                  <span class="truncate text-sm">
                    <FlexRender {header} />
                  </span>
                  {#if sorted === 'asc'}
                    <ChevronUpIcon aria-hidden="true" class="size-4 shrink-0 opacity-80" />
                  {:else if sorted === 'desc'}
                    <ChevronDownIcon aria-hidden="true" class="size-4 shrink-0 opacity-80" />
                  {/if}
                </div>
              {:else}
                <span class="truncate"><FlexRender {header} /></span>
              {/if}
              {#if header.column.getCanResize()}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="user-select-none absolute -end-2 top-0 z-10 flex h-full w-4 touch-none items-center justify-center before:absolute before:inset-y-2 before:w-px before:-translate-x-px before:bg-input"
                  style="cursor: col-resize"
                  aria-hidden="true"
                  data-slot="column-resize-handle"
                  ondblclick={() => header.column.resetSize()}
                  onmousedown={header.getResizeHandler()}
                  ontouchstart={header.getResizeHandler()}
                ></div>
              {/if}
            </TableHead>
          {/each}
        </TableRow>
      {/each}
    </TableHeader>
    <TableBody
      class="in-data-overflow-x-start:before:rounded-ss-none in-data-overflow-x-end:before:rounded-se-none in-data-overflow-x-start:in-data-[variant=card]:*:[tr]:first:*:[td]:first:rounded-ss-none in-data-overflow-x-end:in-data-[variant=card]:*:[tr]:last:*:[td]:last:rounded-ee-none in-data-overflow-x-end:in-data-[variant=card]:*:[tr]:first:*:[td]:last:rounded-se-none in-data-overflow-x-start:in-data-[variant=card]:*:[tr]:last:*:[td]:first:rounded-es-none"
    >
      {#if rows.length}
        {#each rows as row (row.id)}
          {@const member = row.original}
          <TableRow
            data-state={row.getIsSelected() ? 'selected' : undefined}
            onclick={(event) => {
              if (shouldIgnoreRowSelectionClick(event.target)) return;
              row.toggleSelected();
            }}
          >
            {#each row.getVisibleCells() as cell (cell.id)}
              <TableCell
                class="before:pointer-events-none before:absolute before:inset-y-0 before:z-1 not-data-pinned:before:hidden before:w-4 before:from-card in-[[data-slot=table-row]:hover]:before:from-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] in-[[data-slot=table-row][data-state=selected]]:before:from-[color-mix(in_srgb,var(--card),var(--color-black)_4%)] before:to-transparent data-[pinned=start]:before:start-full data-[pinned=end]:before:end-full in-data-overflow-x-end:data-[pinned=end]:before:bg-linear-to-l data-[pinned=start]:max-md:before:hidden data-[pinned=start]:md:sticky data-[pinned=start]:md:start-(--pinned-start-offset) in-data-overflow-x-start:data-[pinned=start]:md:before:bg-linear-to-r dark:in-[[data-slot=table-row]:hover]:before:from-[color-mix(in_srgb,var(--card),var(--color-white)_2%)] dark:in-[[data-slot=table-row][data-state=selected]]:before:from-[color-mix(in_srgb,var(--card),var(--color-white)_4%)]"
                style={widthStyle(cell.column, getPinningStyles(cell.column))}
                {...getPinnedDataAttribute(cell.column)}
              >
                {#if cell.column.id === 'select'}
                  <Label>
                    <Checkbox
                      aria-label={`Select ${member.name}`}
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                    />
                  </Label>
                {:else if cell.column.id === 'name'}
                  <div class="flex min-w-0 items-center gap-3">
                    <Avatar class="size-8 shrink-0">
                      {#if member.avatarUrl}
                        <AvatarImage alt={member.name} src={member.avatarUrl} />
                      {/if}
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div class="min-w-0 flex-1">
                      <div class="truncate font-medium text-sm">{member.name}</div>
                      <div class="truncate text-muted-foreground text-sm">{member.email}</div>
                    </div>
                  </div>
                {:else if cell.column.id === 'role'}
                  <RoleBadge role={member.role} />
                {:else if cell.column.id === 'teams'}
                  <BadgeList items={member.teams} />
                {:else if cell.column.id === 'seniority'}
                  <OptionalBadge value={member.seniority} />
                {:else if cell.column.id === 'preferredLanguage'}
                  <OptionalBadge value={member.preferredLanguage} />
                {:else if cell.column.id === 'products'}
                  <BadgeList items={member.products} />
                {:else if cell.column.id === 'userCount'}
                  <BadgeList items={member.userCount ?? []} />
                {:else if cell.column.id === 'region'}
                  <OptionalBadge value={member.region} />
                {:else if cell.column.id === 'lastActive'}
                  <span class="whitespace-nowrap text-muted-foreground text-sm">
                    {member.lastActive}
                  </span>
                {:else if cell.column.id === 'actions'}
                  <div class="flex justify-end">
                    <Button aria-label={`Open ${member.name}`} size="icon-sm" variant="outline">
                      <ArrowUpRightIcon aria-hidden="true" />
                    </Button>
                  </div>
                {/if}
              </TableCell>
            {/each}
          </TableRow>
        {/each}
      {:else}
        <TableRow>
          <TableCell class="h-24 text-center" colspan={columns.length}>No members found.</TableCell>
        </TableRow>
      {/if}
    </TableBody>
  </Table>
  <CardFrameFooter class="flex items-center justify-between gap-2 border-t">
    <p class="text-muted-foreground text-sm">
      {#if selectedCount > 0}
        <strong class="font-medium text-foreground">{selectedCount}</strong>
        of
        <strong class="font-medium text-foreground">{totalCount}</strong>
        selected
      {:else}
        <strong class="font-medium text-foreground">{totalCount}</strong>
        members
      {/if}
    </p>
  </CardFrameFooter>
</CardFrame>

<script lang="ts">
  import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
  import { move } from '@dnd-kit/helpers';
  import { DragDropProvider } from '@dnd-kit-svelte/svelte';
  import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import ChevronsLeftIcon from '@lucide/svelte/icons/chevrons-left';
  import ChevronsRightIcon from '@lucide/svelte/icons/chevrons-right';
  import LayoutColumnsIcon from '@lucide/svelte/icons/columns-3';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import {
    createColumnHelper,
    createTable,
    createTableState,
    FlexRender,
    type Row,
    type RowSelectionState,
    renderComponent
  } from '@tanstack/svelte-table';
  import { Badge } from '$lib/components/ui/badge';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';
  import { Select, SelectItem, SelectPopup, SelectTrigger } from '$lib/components/ui/select';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '$lib/components/ui/table';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '$lib/components/ui/tabs';
  import { cn } from '$lib/utils';
  import DataTableActions from './data-table-actions.svelte';
  import DataTableCellViewer from './data-table-cell-viewer.svelte';
  import DataTableCheckbox from './data-table-checkbox.svelte';
  import DataTableDragHandle from './data-table-drag-handle.svelte';
  import { type DashboardTableFeatures, features } from './data-table-features.js';
  import DataTableHeaderLimit from './data-table-header-limit.svelte';
  import DataTableHeaderTarget from './data-table-header-target.svelte';
  import DataTableLimit from './data-table-limit.svelte';
  import DataTableReviewer from './data-table-reviewer.svelte';
  import DataTableStatus from './data-table-status.svelte';
  import DataTableTarget from './data-table-target.svelte';
  import DataTableType from './data-table-type.svelte';
  import type { Schema } from './schemas.js';

  let { data }: { data: Schema[] } = $props();

  const columnHelper = createColumnHelper<DashboardTableFeatures, Schema>();

  const columns = columnHelper.columns([
    columnHelper.display({
      id: 'drag',
      header: () => null
    }),
    columnHelper.display({
      id: 'select',
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
          'aria-label': 'Select all'
        }),
      cell: ({ row }) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
          'aria-label': 'Select row'
        }),
      enableSorting: false,
      enableHiding: false
    }),
    columnHelper.accessor('header', {
      header: 'Header',
      cell: ({ row }) => renderComponent(DataTableCellViewer, { item: row.original }),
      enableHiding: false
    }),
    columnHelper.accessor('type', {
      header: 'Section Type',
      cell: ({ row }) => renderComponent(DataTableType, { row })
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => renderComponent(DataTableStatus, { row })
    }),
    columnHelper.accessor('target', {
      header: () => renderComponent(DataTableHeaderTarget, {}),
      cell: ({ row }) => renderComponent(DataTableTarget, { row })
    }),
    columnHelper.accessor('limit', {
      header: () => renderComponent(DataTableHeaderLimit, {}),
      cell: ({ row }) => renderComponent(DataTableLimit, { row })
    }),
    columnHelper.accessor('reviewer', {
      header: 'Reviewer',
      cell: ({ row }) => renderComponent(DataTableReviewer, { row })
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => renderComponent(DataTableActions, {})
    })
  ]);

  // Keep row selection outside the table so the rest of the app can read or update it.
  const [rowSelection, setRowSelection] = createTableState<RowSelectionState>({});

  // v9 manages the rest of its state internally — reads like
  // `table.getRowModel()` are rune-reactive, so no `$state` mirrors are needed.
  const table = createTable({
    features,
    get data() {
      return data;
    },
    columns,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    autoResetPageIndex: false,
    state: {
      get rowSelection() {
        return rowSelection();
      }
    },
    onRowSelectionChange: setRowSelection
  });

  const pagination = $derived(table.atoms.pagination.get());

  let views = [
    {
      id: 'outline',
      label: 'Outline',
      badge: 0
    },
    {
      id: 'past-performance',
      label: 'Past Performance',
      badge: 3
    },
    {
      id: 'key-personnel',
      label: 'Key Personnel',
      badge: 2
    },
    {
      id: 'focus-documents',
      label: 'Focus Documents',
      badge: 0
    }
  ];

  let view = $state('outline');
  let viewLabel = $derived(views.find((v) => view === v.id)?.label ?? 'Select a view');
</script>

<Tabs value="outline" class="w-full flex-col justify-start gap-6">
  <div class="flex items-center justify-between px-4 lg:px-6">
    <Label for="view-selector" class="sr-only">View</Label>
    <Select bind:value={view}>
      <SelectTrigger class="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
        {viewLabel}
      </SelectTrigger>
      <SelectPopup>
        {#each views as view (view.id)}
          <SelectItem value={view.id}>{view.label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <TabsList
      class="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex"
    >
      {#each views as view (view.id)}
        <TabsTab value={view.id}>
          {view.label}
          {#if view.badge > 0}
            <Badge variant="secondary">{view.badge}</Badge>
          {/if}
        </TabsTab>
      {/each}
    </TabsList>
    <div class="flex items-center gap-2">
      <Menu>
        <MenuTrigger class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
          <LayoutColumnsIcon />
          <span class="hidden lg:inline">Customize Columns</span>
          <span class="lg:hidden">Columns</span>
          <ChevronDownIcon />
        </MenuTrigger>
        <MenuPopup align="end" class="w-56">
          {#each table.getAllColumns().filter((col) => typeof col.accessorFn !== 'undefined' && col.getCanHide()) as column (column.id)}
            <MenuCheckboxItem
              class="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </MenuCheckboxItem>
          {/each}
        </MenuPopup>
      </Menu>
      <Button variant="outline" size="sm">
        <PlusIcon />
        <span class="hidden lg:inline">Add Section</span>
      </Button>
    </div>
  </div>
  <TabsPanel value="outline" class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
    <div class="overflow-hidden rounded-lg border">
      <DragDropProvider
        modifiers={[RestrictToVerticalAxis]}
        onDragEnd={(e) => (data = move(data, e))}
      >
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-muted">
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <TableRow>
                {#each headerGroup.headers as header (header.id)}
                  <TableHead colspan={header.colSpan}>
                    {#if !header.isPlaceholder}
                      <FlexRender {header} />
                    {/if}
                  </TableHead>
                {/each}
              </TableRow>
            {/each}
          </TableHeader>
          <TableBody class="**:data-[slot=table-cell]:first:w-8">
            {#if table.getRowModel().rows?.length}
              {#each table.getRowModel().rows as row (row.id)}
                {@render DraggableRow({ row })}
              {/each}
            {:else}
              <TableRow>
                <TableCell colspan={columns.length} class="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            {/if}
          </TableBody>
        </Table>
      </DragDropProvider>
    </div>
    <div class="flex items-center justify-between px-4">
      <div class="hidden flex-1 text-sm text-muted-foreground lg:flex">
        {table.getFilteredSelectedRowModel().rows.length}
        of
        {table.getFilteredRowModel().rows.length}
        row(s) selected.
      </div>
      <div class="flex w-full items-center gap-8 lg:w-fit">
        <div class="hidden items-center gap-2 lg:flex">
          <Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
          <Select
            type="single"
            bind:value={() => `${pagination.pageSize}`, (v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger size="sm" class="w-20" id="rows-per-page">
              {pagination.pageSize}
            </SelectTrigger>
            <SelectPopup side="top">
              {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
                <SelectItem value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              {/each}
            </SelectPopup>
          </Select>
        </div>
        <div class="flex w-fit items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of
          {table.getPageCount()}
        </div>
        <div class="ms-auto flex items-center gap-2 lg:ms-0">
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            onclick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            class="size-8"
            size="icon"
            onclick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            class="size-8"
            size="icon"
            onclick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span class="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            class="hidden size-8 lg:flex"
            size="icon"
            onclick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span class="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  </TabsPanel>
  <TabsPanel value="past-performance" class="flex flex-col px-4 lg:px-6">
    <div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
  </TabsPanel>
  <TabsPanel value="key-personnel" class="flex flex-col px-4 lg:px-6">
    <div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
  </TabsPanel>
  <TabsPanel value="focus-documents" class="flex flex-col px-4 lg:px-6">
    <div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
  </TabsPanel>
</Tabs>

{#snippet DraggableRow({
    row
  }: {
    row: Row<DashboardTableFeatures, Schema>;
  })}
  {@const { ref, isDragging, handleRef } = useSortable({
    id: row.original.id,
    index: () => row.index
  })}

  <TableRow
    data-state={row.getIsSelected() && 'selected'}
    data-dragging={isDragging.current}
    class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
    {@attach ref}
  >
    {#each row.getVisibleCells() as cell (cell.id)}
      <TableCell>
        {#if cell.column.id === 'drag'}
          <!-- The drag handle needs this row's sortable handleRef, so it renders
						here instead of through the column def. -->
          <DataTableDragHandle attach={handleRef} />
        {:else}
          <FlexRender {cell} />
        {/if}
      </TableCell>
    {/each}
  </TableRow>
{/snippet}

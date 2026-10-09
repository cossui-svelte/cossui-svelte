import {
  type Column,
  type ColumnDef,
  columnFilteringFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createSortedRowModel,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures
} from '@tanstack/svelte-table';
import type { ColumnKey, Member } from './members-data.js';

export const features = tableFeatures({
  columnFilteringFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text
  }
});

export type MemberColumn = Column<typeof features, Member, unknown>;

export const FILLER_EXCLUDED_COLUMN_IDS = new Set(['select', 'actions']);

export const INITIAL_COLUMN_PINNING = {
  end: ['actions'],
  start: ['select', 'name']
};

/** Inline style (as a CSS string) for the sticky/pinned positioning of a column. */
export function getPinningStyles(column: MemberColumn): string {
  const isPinned = column.getIsPinned();
  const parts: string[] = [];
  if (isPinned === 'start') parts.push(`--pinned-start-offset:${column.getStart('start')}px`);
  if (isPinned === 'end') {
    parts.push(`inset-inline-end:${column.getAfter('end')}px`, 'position:sticky');
  }
  parts.push(`z-index:${isPinned ? 1 : 0}`);
  return parts.join(';');
}

export function getPinnedDataAttribute(column: MemberColumn): { 'data-pinned'?: 'end' | 'start' } {
  const isPinned = column.getIsPinned();
  return isPinned ? { 'data-pinned': isPinned } : {};
}

export function shouldIgnoreRowSelectionClick(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest(
      'a, button, input, select, textarea, [role="button"], [role="checkbox"], [data-slot="checkbox"], [data-slot="label"]'
    ) !== null
  );
}

export function getFillerColumnId(headers: { column: { id: string } }[]): string {
  for (let i = headers.length - 1; i >= 0; i--) {
    const id = headers[i]?.column.id;
    if (id && !FILLER_EXCLUDED_COLUMN_IDS.has(id)) return id;
  }
  return 'name';
}

export function getColumnDisplayWidth({
  columnId,
  columnsTotalSize,
  fillerColumnId,
  headers,
  size,
  tableWidth
}: {
  columnId: string;
  columnsTotalSize: number;
  fillerColumnId: string;
  headers: { column: { id: string }; getSize: () => number }[];
  size: number;
  tableWidth: number;
}): number {
  if (tableWidth <= columnsTotalSize || columnId !== fillerColumnId) {
    return size;
  }

  const otherSum = headers
    .filter((header) => header.column.id !== fillerColumnId)
    .reduce((sum, header) => sum + header.getSize(), 0);

  return Math.max(size, tableWidth - otherSum);
}

/**
 * Column definitions. Cell rendering is done in `members-table.svelte` (switching on the column id),
 * so only headers, sizes and sorting/resizing flags live here.
 */
export function getColumns(
  columnVisibility: Record<ColumnKey, boolean>
): ColumnDef<typeof features, Member>[] {
  const cols: ColumnDef<typeof features, Member>[] = [
    { enableResizing: false, enableSorting: false, header: 'Select', id: 'select', size: 28 },
    { accessorKey: 'name', header: 'Members', minSize: 160, size: 220 }
  ];

  if (columnVisibility.role) {
    cols.push({ accessorKey: 'role', header: 'Role', minSize: 80, size: 100 });
  }
  if (columnVisibility.teams) {
    cols.push({
      accessorKey: 'teams',
      enableSorting: false,
      header: 'Teams',
      minSize: 120,
      size: 180
    });
  }
  if (columnVisibility.seniority) {
    cols.push({ accessorKey: 'seniority', header: 'Seniority', minSize: 80, size: 100 });
  }
  if (columnVisibility.preferredLanguage) {
    cols.push({
      accessorKey: 'preferredLanguage',
      header: 'Preferred Language',
      minSize: 100,
      size: 140
    });
  }
  if (columnVisibility.products) {
    cols.push({
      accessorKey: 'products',
      enableSorting: false,
      header: 'Products',
      minSize: 120,
      size: 180
    });
  }
  if (columnVisibility.userCount) {
    cols.push({
      accessorKey: 'userCount',
      enableSorting: false,
      header: 'User Count',
      minSize: 100,
      size: 140
    });
  }
  if (columnVisibility.region) {
    cols.push({ accessorKey: 'region', header: 'Region', minSize: 80, size: 110 });
  }
  if (columnVisibility.lastActive) {
    cols.push({
      accessorKey: 'lastActive',
      enableResizing: false,
      header: 'Last active',
      minSize: 90,
      size: 100
    });
  }

  cols.push({
    enableResizing: false,
    enableSorting: false,
    header: 'Actions',
    id: 'actions',
    size: 48
  });

  return cols;
}

<script lang="ts" module>
  import {
    type Booking,
    mockPastBookings,
    mockUpcomingBookings
  } from '../../lib/mock-bookings-data.js';
  import type { FilterField } from './filter-chip-types.js';
  import type { SavedFilter } from './filter-saved-combobox.svelte';

  function toKebabCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function getUniqueEventTypes(bookings: Booking[]): { id: string; label: string }[] {
    const eventTypeMap = new Map<string, { id: string; label: string }>();
    for (const booking of bookings) {
      if (booking.eventType) {
        const id = toKebabCase(booking.eventType.slug);
        if (!eventTypeMap.has(id)) {
          eventTypeMap.set(id, {
            id,
            label: booking.eventType.title
          });
        }
      }
    }
    return Array.from(eventTypeMap.values()).sort((a, b) => a.label.localeCompare(b.label));
  }

  function getUniqueMembers(
    bookings: Booking[]
  ): { avatar: string | null; id: string; label: string }[] {
    const memberMap = new Map<string, { avatar: string | null; id: string; label: string }>();
    for (const booking of bookings) {
      if (booking.user?.name) {
        const id = toKebabCase(booking.user.name);
        if (!memberMap.has(id)) {
          memberMap.set(id, {
            avatar: booking.user.avatarUrl,
            id,
            label: booking.user.name
          });
        }
      }
    }
    return Array.from(memberMap.values()).sort((a, b) => a.label.localeCompare(b.label));
  }

  const allBookings: Booking[] = [...mockPastBookings, ...mockUpcomingBookings];

  /** Example saved views: replace with API data in a real screen. */
  const bookingsSavedFilters: SavedFilter[] = [
    { id: 'my-bookings', isDefault: true, label: 'My bookings' },
    { id: 'team-meetings', label: 'Team meetings' },
    { id: 'client-calls', label: 'Client calls' },
    { id: 'one-on-ones', label: '1:1 meetings' },
    { id: 'demo-calls', label: 'Demo calls' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'external-meetings', label: 'External meetings' },
    { id: 'cancelled', label: 'Cancelled bookings' },
    { id: 'no-show', label: 'No-shows' },
    { id: 'recurring', label: 'Recurring events' },
    { id: 'pending-confirmation', label: 'Pending confirmation' },
    { id: 'this-week', label: 'This week' }
  ];

  export const filterCategories: FilterField[] = [
    {
      id: 'eventTypeId',
      kind: 'options',
      label: 'Event Type',
      options: getUniqueEventTypes(allBookings)
    },
    {
      id: 'userIds',
      kind: 'options',
      label: 'Member',
      options: getUniqueMembers(allBookings),
      showAvatar: true
    },
    {
      id: 'attendeesName',
      kind: 'text',
      label: 'Attendees Name'
    },
    {
      id: 'attendeeEmail',
      kind: 'text',
      label: 'Attendee Email'
    },
    {
      id: 'dateRange',
      kind: 'dateRange',
      label: 'Date Range'
    },
    {
      id: 'bookingUid',
      kind: 'text',
      label: 'Booking UID'
    }
  ];
</script>

<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import FilterAddMenu from './filter-add-menu.svelte';
  import FilterBarActions from './filter-bar-actions.svelte';
  import FilterChipDateRange from './filter-chip-date-range.svelte';
  import FilterChipOptions from './filter-chip-options.svelte';
  import FilterChipText from './filter-chip-text.svelte';
  import {
    type ActiveFilter,
    isActiveFilterComplete,
    type TextFilterOperator
  } from './filter-chip-types.js';
  import FilterSavedCombobox from './filter-saved-combobox.svelte';

  let activeFilters = $state<ActiveFilter[]>([]);
  let newlyAddedFilter = $state<string | null>(null);

  function addFilter(columnId: string, initial?: Partial<Pick<ActiveFilter, 'op' | 'v'>>): void {
    if (activeFilters.some((filter) => filter.f === columnId)) return;
    activeFilters = [...activeFilters, { f: columnId, ...initial }];
  }

  function updateFilter(columnId: string, values: string[], op?: TextFilterOperator): void {
    const exists = activeFilters.some((filter) => filter.f === columnId);
    if (exists) {
      activeFilters = activeFilters.map((filter) =>
        filter.f === columnId
          ? { ...filter, v: values, ...(op !== undefined ? { op } : {}) }
          : filter
      );
    } else {
      activeFilters = [...activeFilters, { f: columnId, v: values, ...(op ? { op } : {}) }];
    }
  }

  function removeFilter(columnId: string): void {
    activeFilters = activeFilters.filter((filter) => filter.f !== columnId);
  }

  function clearAll(): void {
    activeFilters = [];
  }

  function handleSelectFilter(fieldId: string): void {
    const field = filterCategories.find((c) => c.id === fieldId);
    addFilter(fieldId, field?.kind === 'text' ? { op: 'is' } : undefined);
    newlyAddedFilter = fieldId;
  }

  function handleRemoveFilter(columnId: string): void {
    removeFilter(columnId);
    if (newlyAddedFilter === columnId) {
      newlyAddedFilter = null;
    }
  }

  const hasFilters = $derived(activeFilters.length > 0);
  const activeFilterIds = $derived(activeFilters.map((f) => f.f));
  const allComplete = $derived(
    activeFilters.every((f) => {
      const field = filterCategories.find((c) => c.id === f.f);
      if (!field) return false;
      return isActiveFilterComplete(field, f);
    })
  );
  const canAddMore = $derived(filterCategories.some((c) => !activeFilterIds.includes(c.id)));
</script>

<div class="mt-6 flex flex-col gap-2">
  <div class="flex flex-col gap-2 sm:flex-row">
    <div class="flex-1">
      <InputGroup class="sm:max-w-[200px]">
        <InputGroupInput aria-label="Search" placeholder="Search" size="sm" type="search" />
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div class="flex items-center justify-between gap-2">
      <FilterAddMenu
        {activeFilterIds}
        fields={filterCategories}
        {hasFilters}
        onSelectField={handleSelectFilter}
      />
      <FilterSavedCombobox filters={bookingsSavedFilters} />
    </div>
  </div>
  {#if hasFilters}
    <div class="rounded-xl bg-muted">
      <div class="flex flex-wrap items-start justify-between gap-2 overflow-x-auto p-2">
        <div class="flex flex-wrap gap-2">
          {#each activeFilters as filter (filter.f)}
            {@const field = filterCategories.find((c) => c.id === filter.f)}
            {#if field?.kind === 'text'}
              <FilterChipText
                autoOpen={newlyAddedFilter === filter.f}
                {field}
                {filter}
                onRemove={() => handleRemoveFilter(filter.f)}
                onUpdate={(values, op) => updateFilter(filter.f, values, op)}
              />
            {:else if field?.kind === 'dateRange'}
              <FilterChipDateRange
                autoOpen={newlyAddedFilter === filter.f}
                {field}
                {filter}
                onRemove={() => handleRemoveFilter(filter.f)}
                onUpdate={(values) => updateFilter(filter.f, values)}
              />
            {:else if field?.kind === 'options'}
              <FilterChipOptions
                autoOpen={newlyAddedFilter === filter.f}
                {field}
                {filter}
                onRemove={() => handleRemoveFilter(filter.f)}
                onUpdate={(values) => updateFilter(filter.f, values)}
              />
            {/if}
          {/each}
          {#if allComplete && canAddMore}
            <FilterAddMenu
              {activeFilterIds}
              fields={filterCategories}
              {hasFilters}
              onSelectField={handleSelectFilter}
              variant="icon"
            />
          {/if}
        </div>
        <FilterBarActions onClear={clearAll} />
      </div>
    </div>
  {/if}
</div>

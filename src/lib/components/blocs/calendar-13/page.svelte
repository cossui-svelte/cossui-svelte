<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import type { ComponentProps } from 'svelte';
  import { Calendar } from '#lib/components/ui/calendar/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger
  } from '#lib/components/ui/select/index.js';

  let value = $state<CalendarDate>(new CalendarDate(2025, 6, 12));
  let dropdown = $state<ComponentProps<typeof Calendar>['captionLayout']>('dropdown');

  const dropdownOptions = [
    {
      label: 'Month and Year',
      value: 'dropdown'
    },
    {
      label: 'Month Only',
      value: 'dropdown-months'
    },
    {
      label: 'Year Only',
      value: 'dropdown-years'
    }
  ];

  const selectedDropdown = $derived(
    dropdownOptions.find((option) => option.value === dropdown)?.label ?? 'Dropdown'
  );

  const id = $props.id();
</script>

<div class="flex flex-col gap-4">
  <Calendar mode="single" bind:value class="rounded-lg border shadow-sm" captionLayout={dropdown} />
  <div class="flex flex-col gap-3">
    <Label for="{id}-dropdown" class="px-1">Dropdown</Label>
    <Select bind:value={dropdown}>
      <SelectTrigger id="{id}-dropdown" size="sm" class="w-full bg-background">
        {selectedDropdown}
      </SelectTrigger>
      <SelectPopup align="center">
        {#each dropdownOptions as option (option.value)}
          <SelectItem value={option.value}>{option.label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
  </div>
</div>

<script lang="ts">
  import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Card, CardFooter, CardPanel } from '$lib/components/ui/card';

  let todayDate = today(getLocalTimeZone());
  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card class="max-w-[300px] py-4">
  <CardPanel class="px-4">
    <Calendar mode="single" bind:value class="bg-transparent p-0 [--cell-size:--spacing(9.5)]" />
  </CardPanel>
  <CardFooter class="flex flex-wrap gap-2 border-t px-4 !pt-4">
    {#each [
     { label: 'Today', value: 0 },
     { label: 'Tomorrow', value: 1 },
     { label: 'In 3 days', value: 3 },
     { label: 'In a week', value: 7 },
     { label: 'In 2 weeks', value: 14 }
   ] as preset (preset.value)}
      <Button
        variant="outline"
        size="sm"
        class="flex-1"
        onclick={() => {
    value = todayDate?.add({ days: preset.value });
  }}
      >
        {preset.label}
      </Button>
    {/each}
  </CardFooter>
</Card>

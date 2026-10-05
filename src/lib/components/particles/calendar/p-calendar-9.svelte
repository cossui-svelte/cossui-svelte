<script lang="ts">
  import { getLocalTimeZone, today } from '@internationalized/date';
  import { Calendar, Day } from '#lib/components/ui/calendar/index.js';

  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar bind:value mode="single">
  {#snippet day()}
    <Day class="rounded-full" />
  {/snippet}
</Calendar>

<script lang="ts">
  import { getLocalTimeZone, today } from '@internationalized/date';
  import { Calendar } from '#lib/components/ui/calendar/index.js';

  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar mode="single" bind:value />

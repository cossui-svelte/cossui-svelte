<script lang="ts">
  import { badgeVariants } from '#lib/components/ui/badge/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';
  import type { Booking } from '../../lib/mock-bookings-data.js';

  let { booking }: { booking: Booking } = $props();
</script>

<Tooltip>
  <TooltipTrigger
    class={cn(badgeVariants({ variant: 'warning' }), 'pointer-events-none')}
    data-slot="badge"
  >
    Rescheduled
  </TooltipTrigger>
  <TooltipPopup>
    {booking.rescheduledBy
      ? `Rescheduled by ${booking.rescheduledBy}`
      : 'This booking was rescheduled'}
  </TooltipPopup>
</Tooltip>

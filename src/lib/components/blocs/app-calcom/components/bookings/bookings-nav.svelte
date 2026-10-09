<script lang="ts">
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import TabbedNav, { type Tab } from './tabbed-nav.svelte';

  const bookingTabs: Tab[] = [
    { title: 'Upcoming', url: '/booking/upcoming' },
    { title: 'Unconfirmed', url: '/booking/unconfirmed' },
    { title: 'Recurring', url: '/booking/recurring' },
    { title: 'Past', url: '/booking/past' },
    { title: 'Canceled', url: '/booking/canceled' }
  ];
</script>

<div class="max-sm:-mx-4 max-sm:-my-0.5">
  <ScrollArea overscrollContain scrollbarGutter scrollFade>
    <div class="w-fit max-sm:px-4 max-sm:py-0.5">
      <TabbedNav ariaLabel="Filter bookings" tabs={bookingTabs} />
    </div>
  </ScrollArea>
</div>

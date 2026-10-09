<script lang="ts">
  import BookingsNav from '../../../components/bookings/bookings-nav.svelte';
  import BookingsView from '../../../components/bookings/bookings-view.svelte';
  import { mockUpcomingBookingsForTab } from '../../../lib/mock-bookings-data.js';
  import BookingsList from '../bookings-list.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<div class="mb-6 flex justify-between gap-2 max-sm:flex-col sm:flex-wrap sm:items-center">
  <BookingsNav />
  <BookingsView />
</div>
<!-- <BookingsFilters /> -->
<div class="mt-4">
  <BookingsList bookings={mockUpcomingBookingsForTab} listingStatus="upcoming" />
</div>

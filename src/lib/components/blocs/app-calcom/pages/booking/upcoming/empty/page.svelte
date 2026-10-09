<script lang="ts">
  import BookingsNav from '../../../../components/bookings/bookings-nav.svelte';
  import BookingsView from '../../../../components/bookings/bookings-view.svelte';
  import BookingsEmpty from '../../bookings-empty.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<div class="mb-6 flex justify-between gap-2 max-sm:flex-col sm:flex-wrap sm:items-center">
  <BookingsNav />
  <BookingsView />
</div>
<!-- <BookingsFilters /> -->
<div class="mt-4">
  <BookingsEmpty
    description="You have no upcoming bookings found. As soon as someone books a time with you, it will show up here."
    title="No upcoming bookings"
  />
</div>

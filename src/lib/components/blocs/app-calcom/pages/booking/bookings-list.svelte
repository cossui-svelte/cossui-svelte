<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameFooter,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    Pagination,
    PaginationContent,
    PaginationItem
  } from '#lib/components/ui/pagination/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
  import { TooltipProvider } from '#lib/components/ui/tooltip/index.js';
  import type { BookingListingStatus } from '../../lib/booking-action-rules.js';
  import { useLoadingState } from '../../lib/debug.svelte.js';
  import { type Booking, isBookingToday } from '../../lib/mock-bookings-data.js';
  import BookingListItem from './booking-list-item.svelte';
  import BookingsListSkeleton from './bookings-list-skeleton.svelte';

  const ARTIFICIAL_DELAY_MS = 800;

  type Props = {
    bookings: Booking[];
    listingStatus: BookingListingStatus;
  };

  let { bookings, listingStatus }: Props = $props();

  // svelte-ignore state_referenced_locally
  const showLoading = useLoadingState(ARTIFICIAL_DELAY_MS);
  let pageIndex = $state(0);
  let pageSize = $state(10);
  const isUpcoming = $derived(listingStatus === 'upcoming');

  const pageSizeItems = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' }
  ];

  const grouped = $derived.by(() => {
    if (!isUpcoming) {
      return { nextBookings: bookings, todayBookings: [] as Booking[] };
    }

    const today: Booking[] = [];
    const next: Booking[] = [];

    for (const booking of bookings) {
      if (isBookingToday(booking.startTime)) {
        today.push(booking);
      } else {
        next.push(booking);
      }
    }

    return { nextBookings: next, todayBookings: today };
  });
  const todayBookings = $derived(grouped.todayBookings);
  const nextBookings = $derived(grouped.nextBookings);

  const paginatedSource = $derived(isUpcoming ? nextBookings : bookings);
  const totalCount = $derived(paginatedSource.length);
  const totalPages = $derived(Math.ceil(totalCount / pageSize));
  const startIndex = $derived(pageIndex * pageSize);
  const endIndex = $derived(Math.min(startIndex + pageSize, totalCount));
  const paginatedBookings = $derived(paginatedSource.slice(startIndex, endIndex));

  const hasPreviousPage = $derived(pageIndex > 0);
  const hasNextPage = $derived(pageIndex < totalPages - 1);
</script>

{#snippet renderBooking(booking: Booking)}
  <BookingListItem {booking} {listingStatus} />
{/snippet}

{#if showLoading.current}
  <BookingsListSkeleton />
{:else}
  <TooltipProvider delay={0} timeout={0}>
    <CardFrame
      class="**:[[data-slot=card-frame-header]+[data-slot=card]]:rounded-t-none **:[[data-slot=card-frame-header]+[data-slot=card]_[data-slot=list-item]]:rounded-t-none **:[[data-slot=card]:has(+[data-slot=card-frame-header])]:rounded-b-none **:[[data-slot=card]:has(+[data-slot=card-frame-header])_[data-slot=list-item]]:rounded-b-none"
    >
      {#if isUpcoming && todayBookings.length > 0}
        <CardFrameHeader class="py-3">
          <CardFrameTitle class="font-medium text-muted-foreground">Today</CardFrameTitle>
        </CardFrameHeader>
        <Card>
          <CardPanel class="p-0">
            {#each todayBookings as booking (booking.id)}
              {@render renderBooking(booking)}
            {/each}
          </CardPanel>
        </Card>
      {/if}

      {#if isUpcoming && nextBookings.length > 0}
        <CardFrameHeader class="py-3">
          <CardFrameTitle class="font-medium text-muted-foreground">Next</CardFrameTitle>
        </CardFrameHeader>
        <Card>
          <CardPanel class="p-0">
            {#each paginatedBookings as booking (booking.id)}
              {@render renderBooking(booking)}
            {/each}
          </CardPanel>
        </Card>
      {:else if !isUpcoming}
        <Card>
          <CardPanel class="p-0">
            {#each paginatedBookings as booking (booking.id)}
              {@render renderBooking(booking)}
            {/each}
          </CardPanel>
        </Card>
      {/if}

      {#if totalCount > 0 || !isUpcoming}
        <CardFrameFooter>
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <Select
                items={pageSizeItems}
                onValueChange={(value: string | null) => {
                  if (value !== null) {
                    pageSize = Number(value);
                    pageIndex = 0;
                  }
                }}
                value={String(pageSize)}
              >
                <SelectTrigger aria-label="Rows per page" class="w-fit min-w-none" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {#each pageSizeItems as item (item.value)}
                    <SelectItem label={item.label} value={item.value} />
                  {/each}
                </SelectPopup>
              </Select>
              <p class="text-muted-foreground text-sm">rows per page</p>
            </div>

            <div class="flex items-center gap-2">
              <p class="whitespace-nowrap text-muted-foreground text-sm">
                {totalCount === 0 ? '0 of 0' : `${startIndex + 1}-${endIndex} of ${totalCount}`}
              </p>
              <Pagination>
                <PaginationContent class="gap-2">
                  <PaginationItem>
                    <Button
                      aria-label="Go to previous page"
                      class="max-sm:aspect-square max-sm:p-0"
                      disabled={!hasPreviousPage}
                      onclick={() => (pageIndex = pageIndex - 1)}
                      size="sm"
                      variant="outline"
                    >
                      <ChevronLeftIcon class="sm:-ms-1" />
                      <span class="max-sm:hidden">Previous</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      aria-label="Go to next page"
                      class="max-sm:aspect-square max-sm:p-0"
                      disabled={!hasNextPage}
                      onclick={() => (pageIndex = pageIndex + 1)}
                      size="sm"
                      variant="outline"
                    >
                      <span class="max-sm:hidden">Next</span>
                      <ChevronRightIcon class="sm:-me-1" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardFrameFooter>
      {/if}
    </CardFrame>
  </TooltipProvider>
{/if}

<script lang="ts">
  import {
    ListItem,
    ListItemActions,
    ListItemBadges,
    ListItemContent,
    ListItemHeader
  } from '../../components/list-item/index.js';
  import BookingActionsSkeleton from './booking-actions-skeleton.svelte';
  import Skeleton from './skeleton-block.svelte';
</script>

<ListItem>
  <div class="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:gap-4">
    <ListItemContent>
      <ListItemHeader>
        <Skeleton class="h-6 w-full max-w-82 sm:h-5" />
        <Skeleton class="my-0.5 h-4 w-full max-w-82" />
      </ListItemHeader>
      <ListItemBadges>
        <Skeleton class="h-5.5 w-14 sm:h-4.5" />
        <Skeleton class="h-5.5 w-14 sm:h-4.5" />
      </ListItemBadges>
    </ListItemContent>

    <div class="flex flex-col items-start gap-2 md:-order-1 md:w-36 md:shrink-0">
      <div class="flex w-full flex-col gap-1">
        <Skeleton class="h-5 w-full max-w-28" />
        <Skeleton class="my-0.5 h-4 w-full max-w-28" />
      </div>
      <Skeleton class="h-7 w-28 rounded-lg sm:h-6" />
    </div>
  </div>

  <ListItemActions>
    <BookingActionsSkeleton />
  </ListItemActions>
</ListItem>

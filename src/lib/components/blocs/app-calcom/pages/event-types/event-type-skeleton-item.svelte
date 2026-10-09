<script lang="ts">
  import {
    ListItem,
    ListItemBadges,
    ListItemContent,
    ListItemHeader
  } from '../../components/list-item/index.js';
  import EventTypeActionsSkeleton from './event-type-actions-skeleton.svelte';
  import Skeleton from './skeleton-block.svelte';
</script>

<ListItem>
  <ListItemContent>
    <ListItemHeader>
      <div class="flex items-center gap-2">
        <Skeleton class="h-6 w-full max-w-48 sm:h-5" />
        <Skeleton class="h-4 w-full max-w-32 max-sm:hidden" />
      </div>
      <Skeleton class="my-0.5 h-4 w-full max-w-82" />
    </ListItemHeader>
    <ListItemBadges>
      <Skeleton class="h-5.5 w-14 sm:h-4.5" />
      <Skeleton class="h-5.5 w-14 sm:h-4.5" />
    </ListItemBadges>
  </ListItemContent>
  <EventTypeActionsSkeleton />
</ListItem>

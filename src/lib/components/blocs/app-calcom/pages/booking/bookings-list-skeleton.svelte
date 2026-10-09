<script lang="ts">
  import { Card, CardFrame, CardPanel } from '#lib/components/ui/card/index.js';
  import { FrameFooter } from '#lib/components/ui/frame/index.js';
  import BookingSkeletonItem from './booking-skeleton-item.svelte';
  import Skeleton from './skeleton-block.svelte';
</script>

<CardFrame>
  <Card>
    <CardPanel class="p-0">
      <BookingSkeletonItem />
      <BookingSkeletonItem />
      <BookingSkeletonItem />
      <BookingSkeletonItem />
      <BookingSkeletonItem />
    </CardPanel>
  </Card>
  <FrameFooter>
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Skeleton class="h-7 w-12 rounded-lg" />
        <Skeleton class="h-4 w-24" />
      </div>
      <div class="flex items-center gap-2">
        <Skeleton class="h-4 w-12" />
        <div class="flex items-center gap-2">
          <Skeleton class="h-7 w-18 rounded-lg" />
          <Skeleton class="h-7 w-18 rounded-lg" />
        </div>
      </div>
    </div>
  </FrameFooter>
</CardFrame>

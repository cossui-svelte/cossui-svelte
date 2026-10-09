<script lang="ts">
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import { useLoadingState } from '../../lib/debug.svelte.js';
  import BookingsListSkeleton from './bookings-list-skeleton.svelte';

  const ARTIFICIAL_DELAY_MS = 400;

  type Props = {
    /** Skeleton delay; the original uses a different value per tab. */
    delayMs?: number;
    description: string;
    title: string;
  };

  let { delayMs = ARTIFICIAL_DELAY_MS, description, title }: Props = $props();

  // svelte-ignore state_referenced_locally
  const showLoading = useLoadingState(delayMs);
</script>

{#if showLoading.current}
  <BookingsListSkeleton />
{:else}
  <Empty class="rounded-xl border border-dashed md:py-32">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <CalendarIcon />
      </EmptyMedia>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyHeader>
  </Empty>
{/if}

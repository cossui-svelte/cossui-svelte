<script lang="ts">
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import { TooltipProvider } from '#lib/components/ui/tooltip/index.js';
  import { sortableListClasses } from '../../components/list-item/index.js';
  import { SortableItem, SortableList } from '../../components/sortable/index.js';
  import { useLoadingState } from '../../lib/debug.svelte.js';
  import {
    type EventType,
    mockEventTypeGroups,
    mockEventTypes
  } from '../../lib/mock-event-types-data.js';
  import EventTypeItemContent from './event-type-item-content.svelte';
  import EventTypeSkeletonItem from './event-type-skeleton-item.svelte';
  import Skeleton from './skeleton-block.svelte';

  const ARTIFICIAL_DELAY_MS = 800;

  const defaultProfile = mockEventTypeGroups[0]?.profile ?? {
    eventTypesLockedByOrg: false,
    image: null,
    name: 'User',
    slug: 'user'
  };

  const loading = useLoadingState(ARTIFICIAL_DELAY_MS);
  let eventTypes = $state<EventType[]>(mockEventTypes);
  let hiddenStates = $state<Record<number, boolean>>(
    Object.fromEntries(mockEventTypes.map((et) => [et.id, et.hidden]))
  );
  let previousOrder = mockEventTypes;
  let currentToastId: string | null = null;

  function handleReorder(newOrder: EventType[]) {
    if (currentToastId) {
      toastManager.close(currentToastId);
    }

    const previous = previousOrder;
    previousOrder = newOrder;
    eventTypes = newOrder;

    const toastId = toastManager.add({
      actionProps: {
        children: 'Undo',
        onclick: () => {
          toastManager.close(toastId);
          currentToastId = null;
          previousOrder = previous;
          eventTypes = previous;
        }
      },
      title: 'Event type order updated',
      type: 'success'
    });
    currentToastId = toastId;
  }

  function handleHiddenToggle(id: number, hidden: boolean) {
    hiddenStates = { ...hiddenStates, [id]: hidden };
  }

  function getEventTypePath(eventType: EventType) {
    return `/${defaultProfile.slug}/${eventType.slug}`;
  }
</script>

{#if loading.current}
  <Card>
    <CardPanel class="p-0">
      <EventTypeSkeletonItem />
      <EventTypeSkeletonItem />
      <EventTypeSkeletonItem />
      <EventTypeSkeletonItem />
      <EventTypeSkeletonItem />
    </CardPanel>
  </Card>
  <div class="mt-6 text-center text-muted-foreground/72 text-sm">
    <Skeleton class="mx-auto h-5 w-32" />
  </div>
{:else}
  <TooltipProvider delay={0}>
    <SortableList items={eventTypes} onReorder={handleReorder}>
      <Card class={sortableListClasses}>
        <CardPanel class="p-0">
          {#each eventTypes as eventType, index (eventType.id)}
            <SortableItem id={eventType.id} {index}>
              {#snippet children(sortableProps)}
                <EventTypeItemContent
                  {eventType}
                  eventPath={getEventTypePath(eventType)}
                  isHidden={hiddenStates[eventType.id] ?? false}
                  onHiddenChange={(hidden) => handleHiddenToggle(eventType.id, hidden)}
                  {sortableProps}
                />
              {/snippet}
            </SortableItem>
          {/each}
        </CardPanel>
      </Card>
      {#snippet renderOverlay(eventType: EventType)}
        <EventTypeItemContent
          {eventType}
          eventPath={getEventTypePath(eventType)}
          isHidden={hiddenStates[eventType.id] ?? false}
          isOverlay
          onHiddenChange={() => {}}
        />
      {/snippet}
    </SortableList>

    <div class="mt-6 text-center text-muted-foreground/72 text-sm">No more results</div>
  </TooltipProvider>
{/if}

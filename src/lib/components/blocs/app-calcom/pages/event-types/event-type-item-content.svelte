<script lang="ts">
  import ArmchairIcon from '@lucide/svelte/icons/armchair';
  import BanknoteIcon from '@lucide/svelte/icons/banknote';
  import ClipboardCheckIcon from '@lucide/svelte/icons/clipboard-check';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import EyeOffIcon from '@lucide/svelte/icons/eye-off';
  import RepeatIcon from '@lucide/svelte/icons/repeat';
  import ShuffleIcon from '@lucide/svelte/icons/shuffle';
  import UsersIcon from '@lucide/svelte/icons/users';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import {
    ListItemBadges,
    ListItemContent,
    ListItemDescription,
    ListItemDragHandle,
    ListItemHeader,
    ListItemSpanningTrigger,
    ListItemTitle,
    SortableListItem
  } from '../../components/list-item/index.js';
  import type { SortableItemRenderProps } from '../../components/sortable/index.js';
  import { type EventType, formatDuration } from '../../lib/mock-event-types-data.js';
  import { href } from '../../lib/router.svelte.js';
  import EventTypeActions from './event-type-actions.svelte';

  let {
    eventType,
    isHidden,
    eventPath,
    onHiddenChange,
    sortableProps,
    isOverlay = false
  }: {
    eventType: EventType;
    isHidden: boolean;
    eventPath: string;
    onHiddenChange: (hidden: boolean) => void;
    sortableProps?: SortableItemRenderProps;
    isOverlay?: boolean;
  } = $props();

  const schedulingTypeLabel = $derived.by(() => {
    if (!eventType.schedulingType) return null;
    switch (eventType.schedulingType) {
      case 'ROUND_ROBIN':
        return 'Round Robin';
      case 'COLLECTIVE':
        return 'Collective';
      case 'MANAGED':
        return 'Managed';
      default:
        return null;
    }
  });

  const colors = $derived(
    eventType.eventTypeColor
      ? {
          dark: eventType.eventTypeColor.darkEventTypeColor,
          light: eventType.eventTypeColor.lightEventTypeColor
        }
      : null
  );

  const isRecurring = $derived(eventType.recurringEvent !== null);
  const isPaid = $derived(eventType.price > 0);
  const requiresConfirmation = $derived(eventType.requiresConfirmation);
  const hasSeats = $derived(eventType.seatsPerTimeSlot !== null && eventType.seatsPerTimeSlot > 0);
</script>

<SortableListItem
  hasDragged={sortableProps?.hasDragged}
  {isOverlay}
  labelColorDark={colors?.dark ?? undefined}
  labelColorLight={colors?.light ?? undefined}
  sortableDragging={sortableProps?.isDragging}
  sortableDraggingAny={sortableProps?.isDraggingAny}
  sortableRef={isOverlay ? undefined : sortableProps?.ref}
  sortableStyle={sortableProps?.style}
>
  <ListItemDragHandle />
  <ListItemContent>
    <ListItemHeader>
      <div class="flex items-center gap-2">
        <ListItemTitle>
          <ListItemSpanningTrigger>
            {#snippet child({ props })}
              <a {...props} href={href(eventPath)}>{eventType.title}</a>
            {/snippet}
          </ListItemSpanningTrigger>
        </ListItemTitle>
        <span class="text-muted-foreground text-xs max-sm:hidden">
          {eventPath}
        </span>
      </div>
      {#if eventType.safeDescription}
        <ListItemDescription class="line-clamp-2">
          {eventType.safeDescription}
        </ListItemDescription>
      {/if}
    </ListItemHeader>

    <ListItemBadges>
      <Badge class="pointer-events-none tabular-nums" variant="outline">
        <ClockIcon />
        {formatDuration(eventType.length)}
      </Badge>
      {#if schedulingTypeLabel}
        <Badge class="pointer-events-none" variant="outline">
          {#if eventType.schedulingType === 'ROUND_ROBIN'}
            <ShuffleIcon />
          {:else}
            <UsersIcon />
          {/if}
          {schedulingTypeLabel}
        </Badge>
      {/if}
      {#if isRecurring}
        <Badge class="pointer-events-none" variant="outline">
          <RepeatIcon />
          Recurring
        </Badge>
      {/if}
      {#if isPaid}
        <Badge class="pointer-events-none tabular-nums" variant="outline">
          <BanknoteIcon />${(eventType.price / 100).toFixed(0)}
        </Badge>
      {/if}
      {#if requiresConfirmation}
        <Badge class="pointer-events-none" variant="outline">
          <ClipboardCheckIcon />
          Requires confirmation
        </Badge>
      {/if}
      {#if hasSeats}
        <Badge class="pointer-events-none" variant="outline">
          <ArmchairIcon />
          {eventType.seatsPerTimeSlot} seats
        </Badge>
      {/if}
      {#if isHidden}
        <Badge class="pointer-events-none" variant="warning">
          <EyeOffIcon />
          Hidden
        </Badge>
      {/if}
    </ListItemBadges>
  </ListItemContent>

  <EventTypeActions {isHidden} {onHiddenChange} />
</SortableListItem>

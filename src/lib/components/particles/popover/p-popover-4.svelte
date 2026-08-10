<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { Badge } from '$lib/components/ui/badge';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { CheckboxGroup } from '$lib/components/ui/checkbox-group';
  import { Group, GroupSeparator } from '$lib/components/ui/group';
  import { Label } from '$lib/components/ui/label';
  import {
    Popover,
    PopoverClose,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger
  } from '$lib/components/ui/popover';

  const occurrences = [
    { date: 'Wed, Jul 15', id: 'occurrence-1', time: '9:00 – 9:30am' },
    { date: 'Wed, Jul 15', id: 'occurrence-2', time: '10:00 – 10:30am' },
    { date: 'Wed, Jul 15', id: 'occurrence-3', time: '11:00 – 11:30am' }
  ];

  let selected = $state(occurrences.map((occurrence) => occurrence.id));
</script>

<div class="flex gap-2">
  <Button class={buttonVariants({ size: 'xs', variant: 'outline' })} type="button">Reject</Button>
  <Group aria-label="Confirm booking">
    <Button class={buttonVariants({ size: 'xs' })} type="button">Confirm all</Button>
    <GroupSeparator class="bg-primary/72" />
    <Popover>
      <PopoverTrigger
        aria-label="Choose occurrences to confirm"
        class={buttonVariants({ size: 'icon-xs' })}
      >
        <ChevronDown aria-hidden="true" />
      </PopoverTrigger>
      <PopoverPopup align="end" class="w-84">
        <div class="mb-3">
          <PopoverTitle class="text-sm">Confirm occurrences</PopoverTitle>
          <PopoverDescription class="text-xs">
            {occurrences.length} pending for this booking
          </PopoverDescription>
        </div>
        <CheckboxGroup
          aria-label="Occurrences to confirm"
          class="gap-0 self-stretch"
          onValueChange={(value) => (selected = value)}
          value={selected}
        >
          {#each occurrences as occurrence (occurrence.id)}
            <Label class="flex w-full gap-2 py-1.5">
              <Checkbox value={occurrence.id} />
              <span class="tabular-nums">{occurrence.time}</span>
              <span class="ms-auto font-normal text-muted-foreground">{occurrence.date}</span>
            </Label>
          {/each}
        </CheckboxGroup>
        <div class="mt-3 flex justify-end gap-2">
          <PopoverClose
            class={buttonVariants({ size: 'xs', variant: 'ghost' })}
            disabled={selected.length === 0}
          >
            Reject selected
          </PopoverClose>
          <PopoverClose class={buttonVariants({ size: 'xs' })} disabled={selected.length === 0}>
            Confirm selected
            <Badge class="-me-1 text-primary-foreground/60">{selected.length}</Badge>
          </PopoverClose>
        </div>
      </PopoverPopup>
    </Popover>
  </Group>
</div>

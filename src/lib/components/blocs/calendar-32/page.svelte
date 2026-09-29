<script lang="ts">
  import { type DateValue, getLocalTimeZone } from '@internationalized/date';
  import CalendarPlusIcon from '@lucide/svelte/icons/calendar-plus';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import {
    Drawer,
    DrawerDescription,
    DrawerHeader,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '$lib/components/ui/drawer';
  import { Label } from '$lib/components/ui/label';
  import { cn } from '$lib/utils';

  let open = $state(false);
  let value = $state<DateValue | undefined>();
  const id = $props.id();

  const triggerLabel = $derived.by(() => {
    if (value) return value.toDate(getLocalTimeZone()).toLocaleDateString();
    return 'Select date';
  });
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Date of birth</Label>
  <Drawer bind:open>
    <DrawerTrigger
      id="{id}-date"
      class={cn(buttonVariants({ variant: 'outline' }), 'w-48 justify-between font-normal')}
    >
      {triggerLabel}
      <CalendarPlusIcon />
    </DrawerTrigger>
    <DrawerPopup class="w-auto overflow-hidden p-0">
      <DrawerHeader class="sr-only">
        <DrawerTitle>Select date</DrawerTitle>
        <DrawerDescription>Set your date of birth</DrawerDescription>
      </DrawerHeader>
      <Calendar
        mode="single"
        bind:value
        captionLayout="dropdown"
        onValueChange={(v) => {
          if (v) {
            open = false;
          }
        }}
        class="mx-auto [--cell-size:clamp(0px,calc(100vw/7.5),52px)]"
      />
    </DrawerPopup>
  </Drawer>
  <div class="px-1 text-sm text-muted-foreground">This example works best on mobile.</div>
</div>

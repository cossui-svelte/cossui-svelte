<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import {
    Popover,
    PopoverClose,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger
  } from '$lib/components/ui/popover';
</script>

<Popover>
  <PopoverTrigger class={buttonVariants({ variant: 'outline' })}>Open Popover</PopoverTrigger>
  <PopoverPopup class="w-80">
    <PopoverClose
      aria-label="Close"
      class={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'absolute inset-e-2 top-2')}
    >
      <X />
    </PopoverClose>
    <div class="mb-2">
      <PopoverTitle class="text-base">Notifications</PopoverTitle>
      <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
    </div>
    <PopoverClose class={buttonVariants({ variant: 'outline' })}>Close</PopoverClose>
  </PopoverPopup>
</Popover>

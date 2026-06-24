<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Popover,
    PopoverClose,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
  } from "$lib/components/ui/popover";
</script>

<Popover>
  <PopoverTrigger class={buttonVariants({ variant: "outline" })}>Open Popover</PopoverTrigger>
  <PopoverPopup class="w-80">
    <PopoverClose
      aria-label="Close"
      class={`absolute end-2 top-2 ${buttonVariants({ size: "icon", variant: "ghost" })}`}
    >
      <X />
    </PopoverClose>
    <div class="mb-2">
      <PopoverTitle class="text-base">Notifications</PopoverTitle>
      <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
    </div>
    <PopoverClose class={buttonVariants({ variant: "outline" })}>Close</PopoverClose>
  </PopoverPopup>
</Popover>

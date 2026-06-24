<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    Popover,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
  } from "$lib/components/ui/popover";
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<Popover>
  <PopoverTrigger class={buttonVariants({ variant: "outline" })}>Open Popover</PopoverTrigger>
  <PopoverPopup class="w-80">
    <div class="mb-4">
      <PopoverTitle class="text-base">Send us feedback</PopoverTitle>
      <PopoverDescription>Let us know how we can improve.</PopoverDescription>
    </div>
    <form class="flex w-full flex-col gap-4">
      <Textarea aria-label="Send feedback" id="feedback" placeholder="How can we improve?" />
      <Button type="submit">Send feedback</Button>
    </form>
  </PopoverPopup>
</Popover>

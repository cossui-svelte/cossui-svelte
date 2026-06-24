<script lang="ts">
  import {
    Frame,
    FrameDescription,
    FrameHeader,
    FramePanel,
    FrameTitle,
  } from "$lib/components/ui/frame";
  import { Separator } from "$lib/components/ui/separator";
</script>

<Frame class="w-full">
  <FrameHeader>
    <FrameTitle>Section header</FrameTitle>
    <FrameDescription>Brief description about the section</FrameDescription>
  </FrameHeader>
  <FramePanel class="p-0">
    <div class="p-5">
      <h2 class="font-semibold text-sm">Stacked panel</h2>
      <p class="text-muted-foreground text-sm">Section description</p>
    </div>
    <Separator />
    <div class="p-5">
      <h2 class="font-semibold text-sm">Stacked panel</h2>
      <p class="text-muted-foreground text-sm">Section description</p>
    </div>
  </FramePanel>
</Frame>

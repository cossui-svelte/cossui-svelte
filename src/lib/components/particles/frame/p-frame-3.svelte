<script lang="ts">
  import {
    Frame,
    FrameDescription,
    FrameHeader,
    FramePanel,
    FrameTitle,
  } from "$lib/components/ui/frame";
</script>

<Frame class="w-full">
  <FrameHeader>
    <FrameTitle>Section header</FrameTitle>
    <FrameDescription>Brief description about the section</FrameDescription>
  </FrameHeader>
  <FramePanel>
    <h2 class="font-semibold text-sm">Separated panel</h2>
    <p class="text-muted-foreground text-sm">Section description</p>
  </FramePanel>
  <FramePanel>
    <h2 class="font-semibold text-sm">Separated panel</h2>
    <p class="text-muted-foreground text-sm">Section description</p>
  </FramePanel>
</Frame>

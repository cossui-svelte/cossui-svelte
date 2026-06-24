<script lang="ts">
  import ZoomIn from "@lucide/svelte/icons/zoom-in";
  import ZoomOut from "@lucide/svelte/icons/zoom-out";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
</script>

<Group aria-label="Zoom controls" orientation="vertical">
  <Button aria-label="Zoom in" size="icon" variant="outline">
    <ZoomIn aria-hidden />
  </Button>
  <GroupSeparator orientation="horizontal" />
  <Button aria-label="Zoom Out" size="icon" variant="outline">
    <ZoomOut aria-hidden />
  </Button>
</Group>

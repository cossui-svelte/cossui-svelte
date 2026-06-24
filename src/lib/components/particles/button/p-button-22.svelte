<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import Circle from "@lucide/svelte/icons/circle";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="inline-grid w-fit grid-cols-3 gap-1">
  <Button aria-label="Pan camera up" class="col-start-2" size="icon" variant="outline">
    <ChevronUp aria-hidden="true" />
  </Button>
  <Button aria-label="Pan camera left" class="col-start-1" size="icon" variant="outline">
    <ChevronLeft aria-hidden="true" />
  </Button>
  <div aria-hidden="true" class="flex items-center justify-center">
    <Circle class="size-4 opacity-80" />
  </div>
  <Button aria-label="Pan camera right" size="icon" variant="outline">
    <ChevronRight aria-hidden="true" />
  </Button>
  <Button aria-label="Pan camera down" class="col-start-2" size="icon" variant="outline">
    <ChevronDown aria-hidden="true" />
  </Button>
</div>

<script lang="ts">
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { Button } from "$lib/components/ui/button";
</script>

<Button class="h-auto! gap-4 px-4 py-3 text-left" variant="outline">
  <div class="flex flex-col gap-0.5">
    <h3>Talent Agency</h3>
    <p class="whitespace-break-spaces font-normal text-muted-foreground">
      Matches for your roster
    </p>
  </div>
  <ChevronRight
    aria-hidden="true"
    class="in-[[data-slot=button]:hover]:translate-x-0.5 transition-transform"
  />
</Button>

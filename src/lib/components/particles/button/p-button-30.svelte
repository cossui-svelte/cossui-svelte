<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button";
</script>

<Button>
  Get Started
  <ArrowRight
    aria-hidden="true"
    class="in-[[data-slot=button]:hover]:translate-x-0.5 transition-transform"
  />
</Button>

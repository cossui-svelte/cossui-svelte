<script lang="ts">
  import Printer from "@lucide/svelte/icons/printer";
  import { Button } from "$lib/components/ui/button";
  import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
</script>

<Button variant="outline">
  <Printer aria-hidden="true" />
  Print
  <KbdGroup class="-me-1">
    <Kbd>&#8984;</Kbd>
    <Kbd>P</Kbd>
  </KbdGroup>
</Button>

<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
</script>

<ToggleGroup value="bold" size="lg">
  <ToggleGroupItem aria-label="Toggle bold" value="bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem aria-label="Toggle italic" value="italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem aria-label="Toggle underline" value="underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>

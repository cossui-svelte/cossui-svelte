<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import {
    ToggleGroup,
    ToggleGroupItem,
    ToggleGroupSeparator,
  } from "$lib/components/ui/toggle-group";
</script>

<ToggleGroup defaultValue={["bold"]} orientation="vertical" variant="outline">
  <ToggleGroupItem aria-label="Toggle bold" value="bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupSeparator orientation="horizontal" />
  <ToggleGroupItem aria-label="Toggle italic" value="italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupSeparator orientation="horizontal" />
  <ToggleGroupItem aria-label="Toggle underline" value="underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>

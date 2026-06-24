<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import { Toggle } from "$lib/components/ui/toggle";
</script>

<div class="flex items-center gap-1">
  <Toggle aria-label="Toggle bold" variant="outline">
    <BoldIcon />
  </Toggle>
  <Toggle aria-label="Toggle italic" variant="outline">
    <ItalicIcon />
  </Toggle>
  <Toggle aria-label="Toggle underline" variant="outline">
    <UnderlineIcon />
  </Toggle>
</div>

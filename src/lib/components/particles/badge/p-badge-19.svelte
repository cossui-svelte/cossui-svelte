<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import { Badge } from "$lib/components/ui/badge";
  import { Checkbox } from "$lib/components/ui/checkbox";

  const id = $props.id();
</script>

<Badge class="relative outline-none has-focus-visible:border-ring has-data-[state=unchecked]:bg-muted has-data-[state=unchecked]:text-muted-foreground has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50">
  <Checkbox
    class="peer sr-only after:absolute after:inset-0"
    checked
    {id}
  />
  <Check
    aria-hidden="true"
    class="hidden peer-data-[state=checked]:block"
  />
  <label
    class="cursor-pointer select-none after:absolute after:inset-0"
    for={id}
  >
    Selectable
  </label>
</Badge>

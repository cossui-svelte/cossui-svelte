<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import { Badge } from "$lib/components/ui/badge";
  import { Checkbox } from "$lib/components/ui/checkbox";

  const id = $props.id();
</script>

<Badge
  class="relative outline-none has-focus-visible:border-ring has-data-unchecked:bg-muted has-data-unchecked:text-muted-foreground has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
>
  <Checkbox class="peer hidden" checked {id} />
  <CheckIcon aria-hidden="true" className="hidden peer-data-checked:block" />
  <label
    class="cursor-pointer select-none after:absolute after:inset-0"
    for={id}
  >
    Selectable
  </label>
</Badge>

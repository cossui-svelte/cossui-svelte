<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import { Badge } from "$lib/components/ui/badge";

  let isActive = $state(true);
</script>

{#if isActive}
  <Badge class="gap-0">
    Removable
    <button
      class="-my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 text-primary-foreground/60 outline-none transition-[color,box-shadow] hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      onclick={() => (isActive = false)}
      type="button"
    >
      <X aria-hidden="true" />
    </button>
  </Badge>
{/if}

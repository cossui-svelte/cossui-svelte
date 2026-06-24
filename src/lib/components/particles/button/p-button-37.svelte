<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button";

  let open = $state(false);
</script>

<Button
  aria-expanded={open}
  aria-label={open ? "Close menu" : "Open menu"}
  class="rounded-full before:rounded-full"
  onclick={() => (open = !open)}
  size="icon"
  variant="outline"
>
  <Plus
    aria-hidden="true"
    class="in-[[aria-expanded=true]]:rotate-[135deg] transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]"
  />
</Button>

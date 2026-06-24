<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";
</script>

<Button
  onclick={() => {
    toastManager.add({
      description: "Please wait while we process your request.",
      title: "Loading…",
      type: "loading",
    });
  }}
  variant="outline"
>
  Loading Toast
</Button>

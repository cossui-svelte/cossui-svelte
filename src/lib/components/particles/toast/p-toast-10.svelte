<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";

  const DEDUP_ID = "coss-demo-dedup-toast";
</script>

<Button
  onclick={() => {
    toastManager.add({
      description: "Repeated clicks update this toast instead of stacking another.",
      id: DEDUP_ID,
      title: "Saved",
      type: "success",
    });
  }}
  variant="outline"
>
  One Success Toast
</Button>

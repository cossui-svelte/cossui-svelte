<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";

  const ERROR_TOAST_ID = "coss-demo-error-upsert";
</script>

<Button
  onclick={() => {
    toastManager.add({
      description: "Repeated clicks update this toast; errors use a shake animation.",
      id: ERROR_TOAST_ID,
      title: "Something went wrong",
      type: "error",
    });
  }}
  variant="outline"
>
  One Error Toast
</Button>

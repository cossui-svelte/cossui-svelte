<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";
</script>

<div class="flex flex-wrap gap-2">
  <Button
    onclick={() => {
      toastManager.add({
        description: "Your changes have been saved.",
        title: "Success!",
        type: "success",
      });
    }}
    variant="outline"
  >
    Success Toast
  </Button>
  <Button
    onclick={() => {
      toastManager.add({
        description: "There was a problem with your request.",
        title: "Uh oh! Something went wrong.",
        type: "error",
      });
    }}
    variant="outline"
  >
    Error Toast
  </Button>
  <Button
    onclick={() => {
      toastManager.add({
        description: "You can add components to your app using the cli.",
        title: "Heads up!",
        type: "info",
      });
    }}
    variant="outline"
  >
    Info Toast
  </Button>
  <Button
    onclick={() => {
      toastManager.add({
        description: "Your session is about to expire.",
        title: "Warning!",
        type: "warning",
      });
    }}
    variant="outline"
  >
    Warning Toast
  </Button>
</div>

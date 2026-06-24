<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";
</script>

<Button
  onclick={() => {
    toastManager.add({
      description: "Monday, January 3rd at 6:00pm",
      title: "Event has been created",
    });
  }}
  variant="outline"
>
  Default Toast
</Button>

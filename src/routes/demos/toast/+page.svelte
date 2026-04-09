<script lang="ts">
    import { ToastProvider } from "$lib/components/ui/toast";
    import { Button } from "$lib/components/ui/button";
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

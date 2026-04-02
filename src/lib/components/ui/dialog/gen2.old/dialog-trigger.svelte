<script lang="ts">
    import { Dialog as DialogPrimitive } from "bits-ui";
    const props = $props();
</script>

<DialogPrimitive.Trigger data-slot="dialog-trigger" {...props}>
    {@render props.children?.()}
</DialogPrimitive.Trigger>

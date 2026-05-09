<script lang="ts">
    import { Dialog as DialogPrimitive } from "bits-ui";
    const props = $props();
</script>

<DialogPrimitive.Close data-slot="dialog-close" {...props}>
    {@render props.children?.()}
</DialogPrimitive.Close>

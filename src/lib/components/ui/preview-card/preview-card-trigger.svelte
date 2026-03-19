<script lang="ts">
    import type { Snippet } from "svelte";
    import { LinkPreview } from "bits-ui";

    type Props = LinkPreview.TriggerProps & { children?: Snippet };

    let { children, ...restProps }: Props = $props();
</script>

<LinkPreview.Trigger data-slot="preview-card-trigger" {...restProps}>
    {@render children?.()}
</LinkPreview.Trigger>

<script lang="ts">
    import type { Snippet } from "svelte";
    import { LinkPreview } from "bits-ui";

    type Props = LinkPreview.RootProps & { children?: Snippet };

    let { children, ...restProps }: Props = $props();
</script>

<LinkPreview.Root {...restProps}>
    {@render children?.()}
</LinkPreview.Root>

<script lang="ts">
import type { LinkPreview } from 'bits-ui';
import type { Snippet } from 'svelte';

type Props = LinkPreview.RootProps & { children?: Snippet };

let { children, ...restProps }: Props = $props();
</script>

<LinkPreview.Root {...restProps}>
    {@render children?.()}
</LinkPreview.Root>

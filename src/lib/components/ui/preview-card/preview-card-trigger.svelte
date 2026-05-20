<script lang="ts">
import type { LinkPreview } from 'bits-ui';
import type { Snippet } from 'svelte';

type Props = LinkPreview.TriggerProps & { children?: Snippet };

let { children, ...restProps }: Props = $props();
</script>

<LinkPreview.Trigger data-slot="preview-card-trigger" {...restProps}>
    {@render children?.()}
</LinkPreview.Trigger>

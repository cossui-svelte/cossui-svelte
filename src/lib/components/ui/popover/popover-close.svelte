<script lang="ts">
import type { Popover } from 'bits-ui';
import type { Snippet } from 'svelte';

type Props = Popover.CloseProps & { children?: Snippet };

let { children, ...restProps }: Props = $props();
</script>

<Popover.Close data-slot="popover-close" {...restProps}>
  {@render children?.()}
</Popover.Close>

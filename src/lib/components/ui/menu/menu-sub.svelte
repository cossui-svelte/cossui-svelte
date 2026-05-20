<script lang="ts">
import type { DropdownMenu } from 'bits-ui';
import type { Snippet } from 'svelte';

interface Props extends DropdownMenu.SubProps {
  children?: Snippet;
}

let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Sub {...restProps}>
  {@render children?.()}
</DropdownMenu.Sub>

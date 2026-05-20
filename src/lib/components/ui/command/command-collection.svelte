<script lang="ts">
import type { Command } from 'bits-ui';
import type { Snippet } from 'svelte';

type Props = Command.GroupItemsProps & { children?: Snippet };

let { children, ...restProps }: Props = $props();
</script>

<Command.GroupItems data-slot="command-collection" {...restProps}>
  {@render children?.()}
</Command.GroupItems>

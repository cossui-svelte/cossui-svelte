<script lang="ts">
import type { Command } from 'bits-ui';
import type { Snippet } from 'svelte';

type Props = Command.RootProps & { children?: Snippet };

let { children, ...restProps }: Props = $props();
</script>

<Command.Root data-slot="command" {...restProps}>
  {@render children?.()}
</Command.Root>

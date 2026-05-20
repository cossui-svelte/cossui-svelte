<script lang="ts">
import type { Command } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Command.GroupProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.Group class={cn(className)} data-slot="command-group" {...restProps}>
  {@render children?.()}
</Command.Group>

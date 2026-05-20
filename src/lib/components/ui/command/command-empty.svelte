<script lang="ts">
import type { Command } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Command.EmptyProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.Empty
  class={cn("not-empty:py-6 text-center text-base text-muted-foreground sm:text-sm", className)}
  data-slot="command-empty"
  {...restProps}
>
  {@render children?.()}
</Command.Empty>

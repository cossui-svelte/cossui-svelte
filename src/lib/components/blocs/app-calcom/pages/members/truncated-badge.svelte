<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { cn } from '#lib/utils.js';

  let { children, class: className, ...restProps }: ComponentProps<typeof Badge> = $props();
</script>

<Badge class={cn('min-w-0 max-w-full shrink overflow-hidden', className)} {...restProps}>
  <span class="min-w-0 truncate">{@render children?.()}</span>
</Badge>

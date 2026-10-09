<script lang="ts">
  import XIcon from '@lucide/svelte/icons/x';
  import type { Snippet } from 'svelte';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Group, GroupSeparator, GroupText } from '#lib/components/ui/group/index.js';
  import { cn } from '#lib/utils.js';

  let {
    children,
    label,
    onRemove
  }: {
    children?: Snippet;
    label: string;
    onRemove: () => void;
  } = $props();
</script>

<Group>
  <GroupText class={cn(buttonVariants({ size: 'xs', variant: 'outline' }), 'pointer-events-none')}>
    {label}
  </GroupText>
  <GroupSeparator />
  {@render children?.()}
  <GroupSeparator />
  <Button aria-label="Remove filter" onclick={onRemove} size="icon-xs" variant="outline">
    <XIcon aria-hidden="true" />
  </Button>
</Group>

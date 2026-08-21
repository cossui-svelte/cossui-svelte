<script lang="ts">
  import { Avatar as AvatarPrimitive } from '@shardsui/svelte/avatar';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AvatarPrimitive.Fallback> = $props();
</script>

<AvatarPrimitive.Fallback
  bind:ref
  class={cn('flex size-full items-center justify-center rounded-full bg-muted', className)}
  data-slot="avatar-fallback"
  {...restProps}
></AvatarPrimitive.Fallback>

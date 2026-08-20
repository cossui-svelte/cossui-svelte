<script lang="ts">
  import { Avatar as AvatarPrimitive } from '@shardsui/svelte/avatar';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AvatarPrimitive.Root> = $props();
</script>

<AvatarPrimitive.Root
  bind:ref
  data-slot="avatar"
  class={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
  {...restProps}
/>

<script lang="ts">
  import { Avatar as AvatarPrimitive } from '@shardsui/svelte/avatar';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AvatarPrimitive.Image> = $props();
</script>

<AvatarPrimitive.Image
  bind:ref
  class={cn('aspect-square size-full object-cover', className)}
  data-slot="avatar-image"
  {...restProps}
/>

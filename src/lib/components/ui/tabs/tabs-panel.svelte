<script lang="ts">
  import { Tabs as TabsPrimitive } from '@shardsui/svelte/tabs';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof TabsPrimitive.Panel>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<TabsPrimitive.Panel
  class={cn('flex-1 outline-none', className)}
  data-slot="tabs-content"
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Panel>

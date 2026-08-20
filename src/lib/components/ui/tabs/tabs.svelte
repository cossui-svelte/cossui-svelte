<script lang="ts">
  import { Tabs as TabsPrimitive } from '@shardsui/svelte/tabs';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof TabsPrimitive.Root>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<TabsPrimitive.Root
  class={cn('flex flex-col gap-2 data-[orientation=vertical]:flex-row', className)}
  data-slot="tabs"
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Root>

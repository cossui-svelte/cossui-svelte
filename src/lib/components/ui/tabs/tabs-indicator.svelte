<script lang="ts">
  import { Tabs as TabsPrimitive } from '@shardsui/svelte/tabs';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof TabsPrimitive.Indicator>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<TabsPrimitive.Indicator class={className} {...restProps}>
  {@render children?.()}
</TabsPrimitive.Indicator>

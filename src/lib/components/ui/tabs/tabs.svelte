<script lang="ts">
import type { Tabs } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Tabs.RootProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Tabs.Root
  class={cn(
    "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
    className,
  )}
  data-slot="tabs"
  {...restProps}
>
  {@render children?.()}
</Tabs.Root>

<script lang="ts">
import type { Toolbar } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Toolbar.GroupItemProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Toolbar.GroupItem
  class={cn(className)}
  data-slot="toolbar-group-item"
  {...restProps}
>
  {@render children?.()}
</Toolbar.GroupItem>

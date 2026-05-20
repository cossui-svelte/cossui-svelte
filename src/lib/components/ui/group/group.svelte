<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

import { type GroupVariants, groupVariants } from './groupVariants';

interface Props extends HTMLAttributes<HTMLDivElement> {
  orientation?: GroupVariants;
  children?: Snippet;
}

let { class: className, orientation, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(groupVariants({ orientation }), className)}
  data-orientation={orientation}
  data-slot="group"
  role="group"
  {...restProps}
>
  {@render children?.()}
</div>

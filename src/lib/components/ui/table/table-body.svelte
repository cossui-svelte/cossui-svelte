<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLTableSectionElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<tbody
  class={cn("[&_tr:last-child]:border-0", className)}
  data-slot="table-body"
  {...restProps}
>
  {@render children?.()}
</tbody>

<script lang="ts">
import type { HTMLInputAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';
import Input from '../input/input.svelte';

interface Props extends Omit<HTMLInputAttributes, 'size'> {
  size?: 'sm' | 'default' | 'lg' | number;
  unstyled?: boolean;
}

let { class: className, ...restProps }: Props = $props();
</script>

<Input
  class={cn("h-8 w-full bg-background shadow-none", className)}
  data-sidebar="input"
  data-slot="sidebar-input"
  {...restProps}
/>

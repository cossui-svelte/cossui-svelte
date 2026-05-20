<script lang="ts">
import type { DropdownMenu } from 'bits-ui';
import { cn } from '$lib/utils.js';

let { class: className, ...restProps }: DropdownMenu.SeparatorProps = $props();
</script>

<DropdownMenu.Separator
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="menu-separator"
  {...restProps}
/>

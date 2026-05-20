<script lang="ts">
import type { Separator } from 'bits-ui';
import { cn } from '$lib/utils.js';

type Props = Separator.RootProps;

let { class: className, ...restProps }: Props = $props();
</script>

<Separator.Root
  class={cn("mx-2 my-1 h-px bg-border last:hidden", className)}
  data-slot="autocomplete-separator"
  {...restProps}
/>

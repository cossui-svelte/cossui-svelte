<script lang="ts">
import type { Combobox } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Combobox.GroupProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Group
  class={cn("[[role=group]+&]:mt-1.5", className)}
  data-slot="autocomplete-group"
  {...restProps}
>
  {@render children?.()}
</Combobox.Group>

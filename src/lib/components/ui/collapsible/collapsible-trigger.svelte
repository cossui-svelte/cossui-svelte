<script lang="ts">
import type { Collapsible } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Collapsible.TriggerProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Collapsible.Trigger
  class={cn("cursor-pointer", className)}
  data-slot="collapsible-trigger"
  {...restProps}
>
  {@render children?.()}
</Collapsible.Trigger>

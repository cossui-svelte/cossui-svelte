<script lang="ts">
import type { ComponentProps } from 'svelte';
import type { Textarea } from '$lib/components/ui/textarea';
import { cn } from '$lib/utils.js';

let {
  ref = $bindable(null),
  value = $bindable(),
  class: className,
  ...props
}: ComponentProps<typeof Textarea> = $props();
</script>

<Textarea
	bind:ref
	data-slot="input-group-control"
	class={className}
	unstyled
	bind:value
	{...props}
/>

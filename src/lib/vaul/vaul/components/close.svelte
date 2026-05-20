<script lang="ts">
import { Dialog } from 'bits-ui';
import type { Snippet } from 'svelte';
import { getCtx } from '../ctx.js';

let {
  children,
  class: className,
  ...restProps
}: { children?: Snippet; class?: string; [key: string]: unknown } = $props();

const {
  methods: { closeDrawer }
} = getCtx();
</script>

<Dialog.Close
	onclick={(e) => {
		e.preventDefault();
		closeDrawer();
	}}
	onkeydown={(e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			closeDrawer(true);
		}
	}}
	class={className}
	{...restProps}
>
	{@render children?.()}
</Dialog.Close>

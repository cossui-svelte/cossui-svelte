<script lang="ts">
import type { Snippet } from 'svelte';
import { Card, CardFrame, CardFrameFooter, CardPanel } from '$lib/components/ui/card';
import { cn } from '$lib/utils.js';

interface Props {
  children: Snippet;
  footer: Snippet;
  class?: string;
  colSpan?: number;
}

let { children, footer, class: className, colSpan }: Props = $props();
</script>

<div class={cn('relative flex min-w-0', colSpan === 2 && 'lg:col-span-2', className)}>
	<CardFrame
		class="w-full after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64 dark:bg-background"
	>
		<Card class="min-h-50 flex-1 flex-col flex-wrap overflow-x-auto dark:bg-background">
			<CardPanel class="flex flex-1 items-center justify-center lg:px-8 lg:py-12">
				{@render children()}
			</CardPanel>
		</Card>
		<CardFrameFooter class="flex items-center gap-3 p-2">
			{@render footer()}
		</CardFrameFooter>
	</CardFrame>
</div>

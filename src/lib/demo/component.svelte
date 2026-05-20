<script lang="ts">
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';
import type { AvailableComponentMetadata } from '$data/api/components/components.handler';
import { cn } from '$lib/utils.js';
import CopyButton from './copy-button.svelte';
import ViewComponentButton from './view-component-button.svelte';

type DemoComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  componentData: AvailableComponentMetadata;
  onShallowRouteClick?: (e: MouseEvent) => void;
};

let {
  children,
  componentData,
  onShallowRouteClick,
  ref = $bindable(null),
  ...restProps
}: DemoComponentProps = $props();
</script>

{#snippet actionButtons({ source }: { source: string })}
	<div class={cn('absolute right-2 top-2 flex items-center gap-x-2 rounded-lg')}>
		<ViewComponentButton onclick={onShallowRouteClick} />
		<div class="h-6 w-px bg-border"></div>
		<CopyButton code={source} />
	</div>
{/snippet}

<div bind:this={ref} {...restProps}>
	{@render actionButtons({ source: componentData.code.raw.content })}
	<div>
		{@render children?.()}
	</div>
</div>

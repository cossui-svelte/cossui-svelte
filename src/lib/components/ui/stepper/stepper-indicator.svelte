<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import { getContext, type Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type StepState = 'active' | 'completed' | 'inactive' | 'loading';

	interface StepItemContextValue {
		isLoading: boolean;
		state: StepState;
		step: number;
	}

	let {
		class: className = '',
		children,
		...restProps
	}: {
		class?: string;
		children?: Snippet;
	} = $props();

	const stepItemCtx = getContext<StepItemContextValue>('StepItemContext');
	if (!stepItemCtx) {
		throw new Error('StepperIndicator must be used within a StepperItem');
	}
</script>

<span
	data-slot="stepper-indicator"
	class={cn(
		'flex size-6 items-center justify-center rounded-full border text-xs font-medium',
		stepItemCtx.state === 'active' && 'border-primary bg-primary text-primary-foreground',
		stepItemCtx.state === 'completed' && 'border-primary bg-primary text-primary-foreground',
		stepItemCtx.state === 'inactive' && 'border-border bg-muted text-muted-foreground',
		className
	)}
	data-state={stepItemCtx.state}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if stepItemCtx.isLoading}
		<LoaderCircleIcon class="size-4 animate-spin" />
	{:else if stepItemCtx.state === 'completed'}
		<CheckIcon class="size-4" />
	{:else}
		{stepItemCtx.step}
	{/if}
</span>
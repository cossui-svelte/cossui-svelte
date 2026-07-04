<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		step = $bindable(1),
		orientation = 'horizontal',
		class: className = '',
		children,
		...restProps
	}: {
		step: number;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		children?: Snippet;
	} = $props();

	// State
	let totalSteps = $state(0); // Will be updated by StepperItems

	// Context API
	const stepperContext = {
		get activeStep() {
			return step;
		},
		incrementTotalSteps: () => {
			totalSteps++;
			return totalSteps; // Return the new total for StepperItem to use as its step number
		}, 
		get orientation() {
			return orientation;
		},
		setActiveStep: (newStep: number) => {
			step = newStep;
		},
		get totalSteps() {
			return totalSteps;
		}
	};
	setContext('StepperContext', stepperContext);
</script>

<div
	role="group"
	aria-label="Stepper"
	class={cn(
		'flex w-full flex-wrap items-center justify-between',
		orientation === 'horizontal' ? 'flex-row gap-2' : 'flex-col',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
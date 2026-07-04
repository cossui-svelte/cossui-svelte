<script lang="ts">
	import { getContext, onMount, type Snippet, setContext } from 'svelte';
	import { cn } from '$lib/utils';

	type StepState = 'active' | 'completed' | 'inactive' | 'loading';

	interface StepperContextValue {
		activeStep: number;
		incrementTotalSteps: () => number;
		orientation: 'horizontal' | 'vertical';
	}

	interface StepItemContextValue {
		isDisabled: boolean;
		isLoading: boolean;
		orientation: 'horizontal' | 'vertical';
		state: StepState;
		step: number;
	}

	let {
		step: explicitStep,
		completed = false,
		disabled = false,
		loading = false,
		class: className = '',
		children,
		...restProps
	}: {
		step?: number;
		completed?: boolean;
		disabled?: boolean;
		loading?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	const stepperCtx = getContext<StepperContextValue>('StepperContext');
	if (!stepperCtx) {
		throw new Error('StepperItem must be used within a Stepper');
	}

	let itemStep = $state(explicitStep ?? 0);
	let itemState = $state<StepState>('inactive');
	let itemIsLoading = $state(false);

	onMount(() => {
		if (explicitStep === undefined) {
			itemStep = stepperCtx.incrementTotalSteps();
		}
	});

	$effect(() => {
		const isActive = stepperCtx.activeStep === itemStep;
		itemIsLoading = loading && isActive;
		if (completed || itemStep < stepperCtx.activeStep) {
			itemState = 'completed';
		} else if (isActive) {
			itemState = 'active';
		} else {
			itemState = 'inactive';
		}
	});

	const stepItemCtx: StepItemContextValue = {
		get isDisabled() {
			return disabled;
		},
		get isLoading() {
			return itemIsLoading;
		},
		get orientation() {
			return stepperCtx.orientation;
		}, 
		get state() {
			return itemState;
		},
		get step() {
			return itemStep;
		}
	};

	setContext('StepItemContext', stepItemCtx);
</script>

<div
	data-slot="stepper-item"
	class={cn(
		'group/step flex items-center',
		stepperCtx.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
		className
	)}
	data-state={itemState}
	data-orientation={stepperCtx.orientation}
	data-loading={itemIsLoading ? '' : undefined}
	{...restProps}
>
	{@render children?.()}
</div>
<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { setContext } from 'svelte';

	type SingleRootProps = Extract<SelectPrimitive.RootProps, { type: 'single' }>;
	type SelectItem = { label: string; value: string };
	type Props = (SelectPrimitive.RootProps | (Omit<SingleRootProps, 'type'> & { type?: undefined })) & {
		items?: SelectItem[];
	};

	let { value = $bindable<string | string[] | undefined>(), items = [], ...rootProps }: Props = $props();

	// Recombine `type` with the rest of the discriminated-union props so
	// they stay correlated (SelectPrimitive.RootProps' value shape depends on type).
	const rootPropsWithType = $derived({
		...rootProps,
		type: rootProps.type ?? 'single'
	} as SelectPrimitive.RootProps);

	setContext('coss-select', {
		getLabel: () => {
			if (value == null) return '';
			const scalar = Array.isArray(value) ? value[0] : value;
			const match = items.find((i) => i.value === scalar);
			return match?.label ?? String(scalar ?? '');
		}
	});
</script>

<SelectPrimitive.Root {...rootPropsWithType} bind:value={() => value as never, (v) => (value = v)} />

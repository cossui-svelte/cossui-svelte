<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { setContext } from 'svelte';

	type SingleRootProps = Extract<SelectPrimitive.RootProps, { type: 'single' }>;
	type SelectItem = { label: string; value: string };
	type Props = Omit<SingleRootProps, 'type'> & {
		type?: 'single' | 'multiple';
		items?: SelectItem[];
	};

	let { type = 'single', value = $bindable(), items = [], ...restProps }: Props = $props();

	setContext('coss-select', {
		getLabel: () => {
			if (value == null) return '';
			const match = items.find((i) => i.value === value);
			return match?.label ?? String(value);
		}
	});
</script>

<SelectPrimitive.Root {type} bind:value {...(restProps as any)} />

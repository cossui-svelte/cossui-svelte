<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

	type SingleRootProps = Extract<SelectPrimitive.RootProps, { type: 'single' }>;
	type Props = Omit<SingleRootProps, 'type'> & { type?: 'single' | 'multiple' };

	let { type = 'single', ...restProps }: Props = $props();
</script>

<SelectPrimitive.Root {type} {...(restProps as any)} />

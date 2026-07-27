<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { Texts } from '../../../utils/texts';

	interface Props {
		/** whether the color picker is undefined */
		isUndefined: boolean;
		/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		texts: Texts;
	}

	let { isUndefined = $bindable(), texts }: Props = $props();
</script>

<Label class="nullability-checkbox">
	<Checkbox bind:checked={isUndefined} />
	{texts.label.withoutColor}
</Label>

<style>
	:global(.nullability-checkbox) {
		justify-content: center;
		margin-bottom: 4px;
		grid-area: nullable;
	}
</style>

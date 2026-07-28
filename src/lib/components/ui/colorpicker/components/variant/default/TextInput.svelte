<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Texts } from '../../../utils/texts';
	import type { RgbaColor, HsvaColor } from 'colord';

	interface Props {
		/** if set to false, disables the alpha channel */
		isAlpha: boolean;
		/** rgb color */
		rgb: RgbaColor;
		/** hsv color */
		hsv: HsvaColor;
		/** hex color */
		hex: string;
		/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
		textInputModes: Array<'hex' | 'rgb' | 'hsv'>;
		/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		texts: Texts;
		/** listener, dispatch an event when one of the color changes */
		onInput: (color: { hsv?: HsvaColor; rgb?: RgbaColor; hex?: string }) => void;
	}

	let {
		isAlpha,
		rgb = $bindable(),
		hsv = $bindable(),
		hex = $bindable(),
		textInputModes,
		texts,
		onInput
	}: Props = $props();

	const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;

	let mode: 'hex' | 'rgb' | 'hsv' = $derived(textInputModes[0] || 'hex');

	let nextMode = $derived(textInputModes[(textInputModes.indexOf(mode) + 1) % textInputModes.length]);

	let h = $derived(Math.round(hsv.h));
	let s = $derived(Math.round(hsv.s));
	let v = $derived(Math.round(hsv.v));
	let a = $derived(hsv.a === undefined ? 1 : Math.round(hsv.a * 100) / 100);

	type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

	function updateHex(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		if (HEX_COLOR_REGEX.test(target.value)) {
			hex = target.value;
			onInput({ hex });
		}
	}

	function updateRgb(property: string) {
		return function (e: InputEvent) {
			let value = parseFloat((e.target as HTMLInputElement).value);
			rgb = { ...rgb, [property]: isNaN(value) ? 0 : value };
			onInput({ rgb });
		};
	}

	function updateHsv(property: string) {
		return function (e: InputEvent) {
			let value = parseFloat((e.target as HTMLInputElement).value);
			hsv = { ...hsv, [property]: isNaN(value) ? 0 : value };
			onInput({ hsv });
		};
	}
</script>

<div class="text-input">
	<div class="input-container">
		{#if mode === 'hex'}
			<Input class="hex-input" aria-label={texts.label.hex} value={hex} oninput={updateHex} size="sm" />
		{:else if mode === 'rgb'}
			<Input aria-label={texts.label.r} value={rgb.r} type="number" min="0" max="255" oninput={updateRgb('r')} size="sm" />
			<Input aria-label={texts.label.g} value={rgb.g} type="number" min="0" max="255" oninput={updateRgb('g')} size="sm" />
			<Input aria-label={texts.label.b} value={rgb.b} type="number" min="0" max="255" oninput={updateRgb('b')} size="sm" />
		{:else}
			<Input aria-label={texts.label.h} value={h} type="number" min="0" max="360" oninput={updateHsv('h')} size="sm" />
			<Input aria-label={texts.label.s} value={s} type="number" min="0" max="100" oninput={updateHsv('s')} size="sm" />
			<Input aria-label={texts.label.v} value={v} type="number" min="0" max="100" oninput={updateHsv('v')} size="sm" />
		{/if}
		{#if isAlpha}
			<Input
				aria-label={texts.label.a}
				value={a}
				type="number"
				min="0"
				max="1"
				step="0.01"
				oninput={mode === 'hsv' ? updateHsv('a') : updateRgb('a')}
				size="sm"
			/>
		{/if}
	</div>

	{#if textInputModes.length > 1}
		<Button class="mode-toggle" onclick={() => (mode = nextMode)} size="sm" variant="secondary">
			<span class="disappear" aria-hidden="true">{texts.color[mode]}</span>
			<span class="appear">{texts.changeTo} {texts.color[nextMode]}</span>
		</Button>
	{:else}
		<div class="button-like">{texts.color[mode]}</div>
	{/if}
</div>

<style>
	.text-input {
		margin: var(--text-input-margin, 5px 0 0);
	}
	.input-container {
		display: flex;
		flex: 1;
		gap: 6px;
	}
	.input-container :global([data-slot='input-control']) {
		flex: 1;
		min-width: 0;
	}
	.input-container :global(.hex-input) {
		flex: 3;
	}
	.input-container :global([data-slot='input']) {
		text-align: center;
	}

	.button-like {
		position: relative;
		flex: 1;
		margin: 8px 0 0;
		height: 30px;
		width: 100%;
		border: none;
		background-color: var(--cp-input-color, #eee);
		color: var(--cp-text-color, var(--cp-border-color));
		border-radius: 5px;
		line-height: 30px;
		text-align: center;
		cursor: default;
		font-family: inherit;
	}

	:global(.mode-toggle) {
		width: 100%;
		margin: 8px 0 0;
	}

	.appear,
	.disappear {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		transition: all 0.5s;
	}
	:global(.mode-toggle):hover .disappear,
	.appear {
		opacity: 0;
	}

	.disappear,
	:global(.mode-toggle):hover .appear {
		opacity: 1;
	}
</style>

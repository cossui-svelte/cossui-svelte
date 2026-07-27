<script lang="ts">
	import { colord } from 'colord';
	import type { Components } from '../type/types';
	import { Slider } from '$lib/components/ui/slider';
	import type { Texts } from '../utils/texts';

	interface Props {
		/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
		components: Components;
		/** hue value */
		h: number;
		/** saturation value */
		s: number;
		/** vibrance value */
		v: number;
		/** indicator whether the selected color is light or dark */
		isDark: boolean;
		/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		texts: Texts;
		/** listener, dispatch an event when the user drags, clicks or tabs at the picker */
		onInput: (color: { s: number; v: number }) => void;
	}

	let { components, h, s = $bindable(), v = $bindable(), isDark, texts, onInput }: Props = $props();

	let picker: HTMLDivElement | undefined = $state();

	let isMouseDown = false;

	let pos = $state({ x: 100, y: 0 });
	let pickerColorBg = $derived(colord({ h, s: 100, v: 100, a: 1 }).toHex());

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(min, value), max);
	}

	function onClick(e: { clientX: number; clientY: number }) {
		if (!picker) return;

		const { width, left, height, top } = picker.getBoundingClientRect();
		const mouse = {
			x: clamp(e.clientX - left, 0, width),
			y: clamp(e.clientY - top, 0, height)
		};

		s = clamp(mouse.x / width, 0, 1) * 100;
		v = clamp((height - mouse.y) / height, 0, 1) * 100;

		updateColor();
	}

	function pickerMousedown(e: MouseEvent) {
		e.preventDefault();
		if (e.button === 0) {
			isMouseDown = true;
			onClick(e);
		}
	}

	function mouseUp() {
		isMouseDown = false;
	}

	function mouseMove(e: MouseEvent) {
		if (isMouseDown) onClick(e);
	}

	function touch(e: TouchEvent) {
		e.preventDefault();
		onClick(e.changedTouches[0]);
	}

	$effect(() => {
		if (typeof s === 'number' && typeof v === 'number' && picker)
			pos = {
				x: s,
				y: 100 - v
			};
	});

	function updateColor(color: { s?: number; v?: number } = {}) {
		onInput({ s, v, ...color });
	}
</script>

<svelte:window onmouseup={mouseUp} onmousemove={mouseMove} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="picker"
	bind:this={picker}
	onmousedown={pickerMousedown}
	ontouchstart={touch}
	ontouchmove={touch}
	ontouchend={touch}
	style:--picker-color-bg={pickerColorBg}
>
	<components.pickerIndicator {pos} {isDark} />
	<div class="s" style:--pos-y={pos.y}>
		<Slider
			min={0}
			max={100}
			aria-label={texts.label.s}
			bind:value={() => s, (newS) => updateColor({ s: newS })}
		/>
	</div>
	<div class="v" style:--pos-x={pos.x}>
		<Slider
			min={0}
			max={100}
			orientation="vertical"
			aria-label={texts.label.v}
			bind:value={() => v, (newV) => updateColor({ v: newV })}
		/>
	</div>
</div>

<!-- 
@component Picker wrapper containing the mouse and keyboard logic to select the color. _internal component_ 

**Import**
N.A.

**Use**
N.A.

**Props**
@prop components: Components — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
@prop h: number — hue value
@prop s: number — saturation value
@prop v: number — vibrance value
@prop isDark: boolean — indicator whether the selected color is light or dark
@prop texts: Texts — all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)
@prop onInput: (color: { s: number; v: number }) =&gt; void — listener, dispatch an event when the user drags, clicks or tabs at the picker
-->
<style>
	.picker {
		position: relative;
		display: inline-block;
		width: var(--picker-width, 200px);
		height: var(--picker-height, 200px);
		background:
			linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000), var(--picker-color-bg);
		border-radius: var(--picker-radius, 8px);
		outline: none;
		user-select: none;
		cursor: pointer;
	}

	.s,
	.v {
		position: absolute;
		user-select: none;
		-webkit-user-select: none;
	}

	.s {
		top: calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);
		left: 2px;
		width: calc(var(--picker-width, 200px) - 4px);
		height: var(--picker-indicator-size, 10px);
	}

	.v {
		top: 2px;
		left: calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);
		width: var(--picker-indicator-size, 10px);
		height: calc(var(--picker-height, 200px) - 4px);
	}

	/* these sliders exist only for keyboard access; pointer drag is handled by the picker square itself */
	.s :global([data-slot='slider']),
	.v :global([data-slot='slider']) {
		width: 100%;
		height: 100%;
		min-width: 0;
		min-height: 0;
		pointer-events: none;
	}
	.s :global([data-slot='slider-track']),
	.v :global([data-slot='slider-track']) {
		width: 100%;
		height: 100%;
	}
	.s :global([data-slot='slider-track'])::before,
	.v :global([data-slot='slider-track'])::before,
	.s :global([data-slot='slider-indicator']),
	.v :global([data-slot='slider-indicator']) {
		background: transparent;
	}
	.s :global([data-slot='slider-thumb']),
	.v :global([data-slot='slider-thumb']) {
		background: transparent;
		border: none;
		box-shadow: none;
	}
</style>

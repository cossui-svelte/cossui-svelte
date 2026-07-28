<script lang="ts">
	interface Props {
		/** DOM element of the label wrapper */
		labelElement: HTMLLabelElement | undefined;
		/** hex color */
		hex: string | null;
		/** input label */
		label: string;
		/** input name, useful in a native form */
		name?: string | undefined;
		/** directionality left to right, or right to left*/
		dir: 'ltr' | 'rtl';
	}

	let { labelElement = $bindable(), hex, label, name = undefined, dir }: Props = $props();

	function preventDefault(e: MouseEvent) {
		e.preventDefault();
		/* prevent browser color picker from opening unless javascript is broken */
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
<label bind:this={labelElement} onclick={preventDefault} onmousedown={preventDefault} {dir}>
	<div class="container">
		<input
			type="color"
			{name}
			value={hex}
			onclick={preventDefault}
			onmousedown={preventDefault}
			aria-haspopup="dialog"
		/>
		<div class="alpha"></div>
		<div class="color" style:background={hex}></div>
	</div>
	{label}
</label>

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		border-radius: 3px;
		margin: 4px;
		height: var(--input-size, 25px);
		user-select: none;
	}

	.container {
		position: relative;
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--input-size, 25px);
	}

	input {
		margin: 0;
		padding: 0;
		border: none;
		width: 1px;
		height: 1px;
		flex-shrink: 0;
		opacity: 0;
	}

	.alpha {
		clip-path: circle(50%);
		background: var(--alpha-grid-bg);
	}

	.alpha,
	.color {
		position: absolute;
		width: var(--input-size, 25px);
		height: var(--input-size, 25px);
		border-radius: 50%;
		user-select: none;
	}

	.alpha {
		width: calc(var(--input-size, 25px) - 2px);
		height: calc(var(--input-size, 25px) - 2px);
	}

	input:focus-visible ~ .color {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>

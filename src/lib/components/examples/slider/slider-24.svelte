<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import { Slider } from "$lib/components/ui/slider";
</script>

<div class="space-y-4">
	<Label>Vertical dual range slider and tooltip</Label>
	<div class="flex h-40 justify-center">
		<Slider
			type="multiple"
			value={[2, 7]}
			max={10}
			orientation="vertical"
			aria-label="Vertical slider"
			showTooltip
		/>
	</div>
</div>

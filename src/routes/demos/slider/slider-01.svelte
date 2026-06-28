<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import { Slider } from "$lib/components/ui/slider";
</script>

<div class="space-y-4">
	<Label>Simple slider</Label>
	<Slider type="single" value={25} aria-label="Simple slider" />
</div>

<script lang="ts">
import ComponentPreviewTab from '$lib/components/app/component-preview-tabs.svelte';
import { Slider } from '$lib/components/ui/slider';
</script>

<ComponentPreviewTab>
    <Slider type="single" value={25} aria-label="Simple slider" />
</ComponentPreviewTab>

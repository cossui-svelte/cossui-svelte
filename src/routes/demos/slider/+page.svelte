<script lang="ts">
    import { Slider } from "$lib/components/ui/slider";
    import ComponentPreviewTab from "$lib/components/app/docs/component-preview-tabs.svelte";
</script>

<ComponentPreviewTab>
    <Slider type="single" value={25} aria-label="Simple slider" />
</ComponentPreviewTab>

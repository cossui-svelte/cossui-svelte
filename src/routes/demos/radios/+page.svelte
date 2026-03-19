<script>
    import Label from "$lib/components/ui/label/label.svelte";
    import Radio from "$lib/components/ui/radio-group/Radio.svelte";
    import RadioGroup from "$lib/components/ui/radio-group/RadioGroup.svelte";
</script>

<RadioGroup value="next">
    <Label>
        <Radio value="next" /> Next.js
    </Label>
    <Label>
        <Radio disabled value="vite" /> Vite (disabled)
    </Label>
    <Label>
        <Radio value="astro" /> Astro
    </Label>
</RadioGroup>

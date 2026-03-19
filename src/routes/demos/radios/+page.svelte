<script>
    import Label from "$lib/cossui-components/label.svelte";
    import Radio from "$lib/cossui-components/radio-group/Radio.svelte";
    import RadioGroup from "$lib/cossui-components/radio-group/RadioGroup.svelte";
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

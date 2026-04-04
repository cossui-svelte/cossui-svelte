<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";

    import {
        Select,
        SelectItem,
        SelectPopup,
        SelectTrigger,
        SelectValue,
    } from "$lib/components/ui/select";

    const items = [
        { label: "Next.js", value: "next" },
        { label: "Vite", value: "vite" },
        { label: "Astro", value: "astro" },
    ];
</script>

<ComponentPreviewTabs>
    <Select aria-label="Select framework" defaultValue="next" {items}>
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectPopup>
            {#each items as item}
                <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
            {/each}
        </SelectPopup>
    </Select>
</ComponentPreviewTabs>

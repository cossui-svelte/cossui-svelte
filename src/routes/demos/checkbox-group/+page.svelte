<script lang="ts">
    import { CheckboxGroup } from "$lib/components/ui/checkbox-group";

    import CheckboxTree, {
        type TreeNode,
    } from "$lib/components/ui/checkbox-group/checkbox-tree.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";

    const initialTree: TreeNode = {
        children: [
            {
                defaultChecked: true,
                id: "mountains",
                indeterminate: true,
                label: "Mountains",
            },
            {
                children: [
                    { id: "niagara", label: "Niagara Falls" },
                    {
                        defaultChecked: true,
                        id: "angel-falls",
                        label: "Angel Falls",
                    },
                ],
                id: "waterfalls",
                indeterminate: true,
                label: "Waterfalls",
            },
            { id: "grand-canyon", label: "Grand Canyon" },
        ],
        id: "natural-wonders",
        label: "Natural Wonders",
    };
</script>

<ComponentPreviewTabs>
    <CheckboxGroup aria-label="Select frameworks" value={["next"]}>
        <Label>
            <Checkbox value="next" />
            Next.js
        </Label>
        <Label>
            <Checkbox disabled value="vite" />
            Vite
        </Label>
        <Label>
            <Checkbox value="astro" />
            Astro
        </Label>
    </CheckboxGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <div class="space-y-3">
        <CheckboxTree tree={initialTree}>
            {#snippet renderNode({
                checked,
                children,
                id,
                indeterminate,
                label,
                onCheckedChange,
            })}
                <div class="ms-6 flex items-center gap-2">
                    <Checkbox
                        {id}
                        {checked}
                        {onCheckedChange}
                        {indeterminate}
                    />
                    <Label for={id}>{label}</Label>
                </div>

                {#if children}
                    {#each children as child (child.id)}
                        <div class="ms-6 space-y-3">
                            {@render renderNode(child)}
                        </div>
                    {/each}
                {/if}
            {/snippet}
        </CheckboxTree>
    </div>
</ComponentPreviewTabs>

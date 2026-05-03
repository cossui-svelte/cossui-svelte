<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-svelte";
    import {
        ToggleGroupItem,
        ToggleGroup,
        ToggleGroupSeparator,
    } from "$lib/components/ui/toggle-group";
</script>

<ComponentPreviewTabs>
    <ToggleGroup value={["bold"]} variant="outline">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
            <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
            <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
            <UnderlineIcon />
        </ToggleGroupItem>
    </ToggleGroup>
</ComponentPreviewTabs>

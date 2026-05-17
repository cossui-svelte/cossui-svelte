<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import BoldIcon from "@lucide/svelte/icons/bold-icon";
import ItalicIcon from "@lucide/svelte/icons/italic-icon";
import UnderlineIcon from "@lucide/svelte/icons/underline-icon";
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

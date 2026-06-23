<script lang="ts">
    import BookmarkIcon from "@lucide/svelte/icons/bookmark";
    import { Toggle } from "$lib/components/ui/toggle";
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
</script>

<ComponentPreviewTabs>
    <Toggle
        aria-label="Toggle bookmark"
        size="sm"
        variant="outline"
        class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
        <BookmarkIcon />
        Bookmark
    </Toggle>
</ComponentPreviewTabs>

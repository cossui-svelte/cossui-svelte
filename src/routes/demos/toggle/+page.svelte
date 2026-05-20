<script lang="ts">
import BookmarkIcon from '@lucide/svelte/icons/bookmark';
import ComponentPreviewTabs from '$lib/components/app/component-preview-tabs.svelte';
import { Toggle } from '$lib/components/ui/toggle';
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

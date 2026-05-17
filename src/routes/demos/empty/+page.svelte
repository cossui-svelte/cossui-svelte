<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import BookIcon from "@lucide/svelte/icons/book-icon";
import RouteIcon from "@lucide/svelte/icons/route-icon";
    import { Button } from "$lib/components/ui/button";
    import {
        Empty,
        EmptyContent,
        EmptyDescription,
        EmptyHeader,
        EmptyMedia,
        EmptyTitle,
    } from "$lib/components/ui/empty";
</script>

<ComponentPreviewTabs>
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <RouteIcon />
            </EmptyMedia>
            <EmptyTitle>No upcoming meetings</EmptyTitle>
            <EmptyDescription>Create a meeting to get started.</EmptyDescription
            >
        </EmptyHeader>
        <EmptyContent>
            <div class="flex gap-2">
                <Button size="sm">Create meeting</Button>
                <Button size="sm" variant="outline">
                    <BookIcon />
                    View docs
                </Button>
            </div>
        </EmptyContent>
    </Empty>
</ComponentPreviewTabs>

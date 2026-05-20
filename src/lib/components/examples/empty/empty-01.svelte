<script lang="ts">
import BookIcon from '@lucide/svelte/icons/book';
import RouteIcon from '@lucide/svelte/icons/route';
import { Button } from '$lib/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '$lib/components/ui/empty';
</script>

<Empty>
    <EmptyHeader>
        <EmptyMedia variant="icon">
            <RouteIcon />
        </EmptyMedia>
        <EmptyTitle>No upcoming meetings</EmptyTitle>
        <EmptyDescription>Create a meeting to get started.</EmptyDescription>
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

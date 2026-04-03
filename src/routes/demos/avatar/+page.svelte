<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import {
        Avatar,
        AvatarFallback,
        AvatarImage,
    } from "$lib/components/ui/avatar";
</script>

<ComponentPreviewTabs>
    <Avatar>
        <AvatarImage
            alt="Luke Tracy"
            src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>LT</AvatarFallback>
    </Avatar>
</ComponentPreviewTabs>

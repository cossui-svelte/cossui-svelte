<script>
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";

    const uid = $props.id();
</script>

<ComponentPreviewTabs>
    <div class="flex flex-col items-start gap-2">
        <Label for={uid}>Email</Label>
        <Input
            aria-label="Email"
            id={uid}
            placeholder="you@example.com"
            type="email"
        />
    </div>
</ComponentPreviewTabs>

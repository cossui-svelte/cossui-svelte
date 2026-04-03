<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import {
        InputGroup,
        InputGroupAddon,
        InputGroupInput,
    } from "$lib/components/ui/input-group";
    import { SearchIcon } from "lucide-svelte";
</script>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            type="search"
        />
        <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

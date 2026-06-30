<script lang="ts">
    import {
        Combobox,
        ComboboxEmpty,
        ComboboxInput,
        ComboboxItem,
        ComboboxList,
        ComboboxPopup,
    } from "$lib/components/ui/combobox";
    import { Label } from "$lib/components/ui/label";

    const items = [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Orange", value: "orange" },
        { label: "Grape", value: "grape" },
        { label: "Strawberry", value: "strawberry" },
        { label: "Mango", value: "mango" },
        { label: "Pineapple", value: "pineapple" },
        { label: "Kiwi", value: "kiwi" },
        { label: "Peach", value: "peach" },
        { label: "Pear", value: "pear" },
    ];

    const { id } = $props();
</script>

<Combobox {items}>
    <div class="flex flex-col items-start gap-2">
        <Label for={id}>Fruits</Label>
        <ComboboxInput
            aria-label="Select an item"
            {id}
            placeholder="Select an item..."
        />
    </div>
    <ComboboxPopup>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
            {#each items as item}
                <ComboboxItem value={item.value} label={item.label}>
                    {item.label}
                </ComboboxItem>
            {/each}
        </ComboboxList>
    </ComboboxPopup>
</Combobox>

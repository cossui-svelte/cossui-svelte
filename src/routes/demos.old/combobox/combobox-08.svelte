<script lang="ts">
    import SearchIcon from "@lucide/svelte/icons/search";
    import {
        Combobox,
        ComboboxChip,
        ComboboxChips,
        ComboboxChipsInput,
        ComboboxEmpty,
        ComboboxItem,
        ComboboxList,
        ComboboxPopup,
    } from "$lib/components/ui/combobox";

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

    let multiValue = $state<string[]>(["apple", "strawberry"]);
</script>

<Combobox bind:value={multiValue} {items} type="multiple">
    {#snippet startAddon()}<SearchIcon />{/snippet}
    <ComboboxChips>
        {#each multiValue as val}
            {@const item = items.find((i) => i.value === val)}
            {#if item}
                <ComboboxChip
                    aria-label={item.label}
                    removeProps={{
                        onclick: () => {
                            multiValue = multiValue.filter(
                                (v) => v !== val,
                            );
                        },
                    }}
                >
                    {item.label}
                </ComboboxChip>
            {/if}
        {/each}
        <ComboboxChipsInput
            aria-label="Select a item"
            placeholder={multiValue.length > 0
                ? undefined
                : "Select a item…"}
        />
    </ComboboxChips>
    <ComboboxPopup>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
            {#each items as item}
                <ComboboxItem value={item.value} label={item.label}>
                    {item.label}
                </ComboboxItem>
            {/each}
        </ComboboxList>
    </ComboboxPopup>
</Combobox>

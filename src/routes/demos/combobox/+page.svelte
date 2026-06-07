<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import {
        Combobox,
        ComboboxChip,
        ComboboxChips,
        ComboboxChipsInput,
        ComboboxInput,
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

<ComponentPreviewTabs>
    <Combobox {items}>
        <ComboboxInput
            aria-label="Select a item"
            placeholder="Select a item…"
        />
        <ComboboxPopup>
            <ComboboxList>
                {#each items as item}
                    <ComboboxItem value={item.value} label={item.label}>
                        {item.label}
                    </ComboboxItem>
                {/each}
            </ComboboxList>
        </ComboboxPopup>
    </Combobox>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <Combobox defaultValue={items[2]} disabled {items}>
        <ComboboxInput
            aria-label="Select an item"
            placeholder="Select an item…"
        />
        <ComboboxPopup>
            <ComboboxList>
                {#each items as item}
                    <ComboboxItem value={item.value} label={item.label}>
                        {item.label}
                    </ComboboxItem>
                {/each}
            </ComboboxList>
        </ComboboxPopup>
    </Combobox>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <Combobox bind:value={multiValue} {items} type="multiple">
        <ComboboxChips>
            {#each multiValue as val}
                {@const item = items.find((i) => i.value === val)}
                {#if item}
                    <ComboboxChip
                        aria-label={item.label}
                        removeProps={{ onclick: () => { multiValue = multiValue.filter((v) => v !== val); } }}
                    >
                        {item.label}
                    </ComboboxChip>
                {/if}
            {/each}
            <ComboboxChipsInput
                aria-label="Select a item"
                placeholder={multiValue.length > 0 ? undefined : "Select a item…"}
            />
        </ComboboxChips>
        <ComboboxPopup>
            <ComboboxList>
                {#each items as item}
                    <ComboboxItem value={item.value} label={item.label}>
                        {item.label}
                    </ComboboxItem>
                {/each}
            </ComboboxList>
        </ComboboxPopup>
    </Combobox>
</ComponentPreviewTabs>

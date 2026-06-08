<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import {
        Combobox,
        ComboboxChip,
        ComboboxChips,
        ComboboxChipsInput,
        ComboboxEmpty,
        ComboboxInput,
        ComboboxItem,
        ComboboxList,
        ComboboxPopup,
    } from "$lib/components/ui/combobox";
    import { Label } from "$lib/components/ui/label";
    import { SearchIcon } from "@lucide/svelte";

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

    const { id } = $props();
</script>

<ComponentPreviewTabs>
    Default
    <Combobox {items}>
        <ComboboxInput
            aria-label="Select a item"
            placeholder="Select a item…"
        />
        <ComboboxPopup>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
                {#each items as item}
                    <ComboboxItem value={item.value} label={item.label}
                    ></ComboboxItem>
                {/each}
            </ComboboxList>
        </ComboboxPopup>
    </Combobox>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Small Size
    <Combobox {items}>
        <ComboboxInput
            aria-label="Select a item"
            placeholder="Select a item…"
            size="sm"
        />
        <ComboboxPopup>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxList>
                {#each items as item}
                    <ComboboxItem value={item.value} label={item.label}
                    ></ComboboxItem>
                {/each}
            </ComboboxList>
        </ComboboxPopup>
    </Combobox>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Large Size
    <Combobox {items}>
        <ComboboxInput
            aria-label="Select a item"
            placeholder="Select a item…"
            size="lg"
        />
        <ComboboxPopup>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxList>
                {#each items as item}
                    <ComboboxItem value={item.value} label={item.label}
                    ></ComboboxItem>
                {/each}
            </ComboboxList>
        </ComboboxPopup>
    </Combobox>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Disabled
    <Combobox defaultValue={items[2]} disabled {items}>
        <ComboboxInput
            aria-label="Select an item"
            placeholder="Select an item…"
        />
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
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Autohighlight
    <Combobox defaultValue={items[2]} autoHighlight {items}>
        <ComboboxInput
            aria-label="Select an item"
            placeholder="Select an item…"
        />
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
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Show Clear button
    <Combobox defaultValue={items[2]} showClear {items}>
        <ComboboxInput
            aria-label="Select an item"
            placeholder="Select an item…"
        />
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
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Show Add On
    <Combobox defaultValue={items[2]} showClear {items}>
        <ComboboxInput
            aria-label="Select an item"
            placeholder="Select an item…"
        />
        {#snippet startAddon()}<SearchIcon />{/snippet}
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
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    With Label
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
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Multiple values
    <Combobox bind:value={multiValue} {items} type="multiple">
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
</ComponentPreviewTabs>

<script lang="ts">
    import { Tabs } from "bits-ui";
    import { onMount } from "svelte";

    let activeElement: HTMLElement = null;
</script>

<Tabs.Root class="relative w-full" bind:value let:value>
    <Tabs.List class="relative flex border-b">
        <Tabs.Trigger
            value="tab1"
            class="px-4 py-2"
            bind:this={value === "tab1" ? activeElement : null}
        >
            Tab 1
        </Tabs.Trigger>

        <Tabs.Trigger
            value="tab2"
            class="px-4 py-2"
            bind:this={value === "tab2" ? activeElement : null}
        >
            Tab 2
        </Tabs.Trigger>

        {#if activeElement}
            <div
                class="absolute bottom-0 h-[2px] bg-blue-600 transition-all duration-300"
                style="
          width: {activeElement.offsetWidth}px;
          left: {activeElement.offsetLeft}px;
        "
            />
        {/if}
    </Tabs.List>

    <Tabs.Content value="tab1">Tab 1 Content</Tabs.Content>
    <Tabs.Content value="tab2">Tab 2 Content</Tabs.Content>
</Tabs.Root>

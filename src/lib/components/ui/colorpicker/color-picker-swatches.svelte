<script lang="ts">
    import PlusIcon from "@lucide/svelte/icons/plus";
    import XIcon from "@lucide/svelte/icons/x";
    import { hueyColor } from "@hueycolor/core";
    import { useHueyContext } from "@hueycolor/svelte";

    let {
        swatches = $bindable(),
        editable = true,
    }: { swatches: string[]; editable?: boolean } = $props();

    const ctx = useHueyContext();

    function selectSwatch(swatchColor: string) {
        ctx.setColor(swatchColor);
    }

    function addSwatch() {
        const hex = ctx.colorValue.toHexString();
        if (!swatches.some((s) => hueyColor(s).toHexString() === hex)) {
            swatches = [...swatches, hex];
        }
    }

    function removeSwatch(target: string) {
        swatches = swatches.filter((s) => s !== target);
    }
</script>

<div class="flex flex-wrap items-center gap-2" role="listbox" aria-label="Color swatches">
    {#each swatches as swatchColor (swatchColor)}
        <div class="group relative flex">
            <button
                type="button"
                role="option"
                aria-label={swatchColor}
                aria-selected={ctx.colorValue.toHexString() ===
                    hueyColor(swatchColor).toHexString()}
                class="size-5 shrink-0 cursor-pointer rounded ring-1 ring-inset ring-border transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style:background={swatchColor}
                onclick={() => selectSwatch(swatchColor)}
            ></button>
            {#if editable}
                <button
                    type="button"
                    aria-label={`Remove ${swatchColor}`}
                    class="absolute -top-1.5 -right-1.5 hidden size-3.5 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground opacity-0 shadow-xs transition-opacity group-hover:flex group-hover:opacity-100 group-focus-within:flex group-focus-within:opacity-100 hover:border-destructive hover:bg-destructive hover:text-white focus-visible:flex focus-visible:opacity-100 focus-visible:outline-none"
                    onclick={(e) => {
                        e.stopPropagation();
                        removeSwatch(swatchColor);
                    }}
                >
                    <XIcon class="size-2.5" />
                </button>
            {/if}
        </div>
    {/each}
    {#if editable}
        <button
            type="button"
            aria-label="Add current color to swatches"
            class="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border border-dashed border-input text-muted-foreground transition-colors hover:border-ring hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onclick={addSwatch}
        >
            <PlusIcon class="size-3" />
        </button>
    {/if}
</div>

<!-- <script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Radio from "$lib/components/ui/radio-group/Radio.svelte";
    import RadioGroup from "$lib/components/ui/radio-group/RadioGroup.svelte";
</script>

<ComponentPreviewTabs>
    <RadioGroup value="next">
        <Label>
            <Radio value="next" /> Next.js
        </Label>
        <Label>
            <Radio disabled value="vite" /> Vite (disabled)
        </Label>
        <Label>
            <Radio value="astro" /> Astro
        </Label>
    </RadioGroup>
</ComponentPreviewTabs> -->

<script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";

    import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";

    let selectedValue = $state("on");
</script>

<ComponentPreviewTabs>
    <div class="bg-input/50 inline-flex h-9 rounded-lg p-0.5">
        <RadioGroup
            bind:value={selectedValue}
            class="group after:bg-background after:ring-offset-background has-focus-visible:after:ring-ring relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:shadow-xs after:shadow-black/[.04] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-2 has-focus-visible:after:ring-offset-2 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
            data-state={selectedValue}
        >
            <label
                class="group-data-[state=on]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap"
            >
                Bill Monthly
                <RadioGroupItem value="off" class="sr-only" />
            </label>
            <label
                class="group-data-[state=off]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap"
            >
                <span>
                    Bill Yearly <span
                        class="group-data-[state=on]:text-emerald-500"
                        >-20%</span
                    >
                </span>
                <RadioGroupItem value="on" class="sr-only" />
            </label>
        </RadioGroup>
    </div>
</ComponentPreviewTabs>

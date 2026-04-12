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
    import { Label } from "$lib/components/ui/label";

    import {
        Radio,
        RadioGroup,
        RadioGroupItem,
    } from "$lib/components/ui/radio-group";

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
<ComponentPreviewTabs>
    <RadioGroup value="r-1">
        <Label
            class="flex items-start gap-2 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
        >
            <Radio value="r-1" />
            <div class="flex flex-col gap-1">
                <p>Email</p>
                <p class="text-muted-foreground text-xs">
                    Receive notifications via email.
                </p>
            </div>
        </Label>
        <Label
            class="flex items-start gap-2 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
        >
            <Radio value="r-2" />
            <div class="flex flex-col gap-1">
                <p>SMS</p>
                <p class="text-muted-foreground text-xs">
                    Receive notifications via text message.
                </p>
            </div>
        </Label>
    </RadioGroup>
</ComponentPreviewTabs>

<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { cn } from "$lib/utils";
    import { Separator } from "$lib/components/ui/separator";
    import { getToggleGroupCtx } from "./toggle-group.svelte";

    let {
        class: className,
        ...restProps
    }: ComponentProps<typeof Separator> = $props();

    let orientation = getToggleGroupCtx()?.orientation;

    if (orientation === "vertical") orientation = "horizontal";
    else orientation = "vertical";
</script>

<Separator
    class={cn(
        "pointer-events-none relative bg-input before:absolute before:inset-0 dark:before:bg-input/32",
        className,
    )}
    {orientation}
    {...restProps}
/>

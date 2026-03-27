<script lang="ts">
    import { cn, type WithElementRef } from "$lib/utils.js";
    import type { HTMLAttributes } from "svelte/elements";
    import { Separator } from "$lib/components/ui/separator";

    let {
        ref = $bindable(null),
        class: className,
        orientation = "vertical",
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
        orientation?: "horizontal" | "vertical";
    } = $props();
</script>

<Separator
    class={cn(
        "pointer-events-none relative bg-input before:absolute before:inset-0 dark:before:bg-input/32",
        className,
    )}
    {orientation}
    {...restProps}
/>

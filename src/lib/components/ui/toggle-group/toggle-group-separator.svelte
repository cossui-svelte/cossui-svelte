<script lang="ts">
    import { cn, type WithElementRef } from "$lib/utils.js";
    import { Separator } from "$lib/components/ui/separator";

    let {
        class: className,
        orientation = "vertical",
        ...restProps
    }: Separator & {
        class: string;
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

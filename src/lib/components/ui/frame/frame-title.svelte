<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        children?: Snippet;
    }

    let { class: className, children, ...restProps }: Props = $props();
</script>

<div
    class={cn("font-semibold text-sm", className)}
    data-slot="frame-panel-title"
    {...restProps}
>
    {@render children?.()}
</div>

<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    interface Props extends HTMLAttributes<HTMLHeadElement> {
        children?: Snippet;
    }

    let { class: className, children, ...restProps }: Props = $props();
</script>

<header
    class={cn("flex flex-col px-5 py-4", className)}
    data-slot="frame-panel-header"
    {...restProps}
>
    {@render children?.()}
</header>

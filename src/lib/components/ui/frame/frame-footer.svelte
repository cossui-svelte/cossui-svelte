<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    interface Props extends HTMLAttributes<HTMLElement> {
        children?: Snippet;
    }

    let { class: className, children, ...restProps }: Props = $props();
</script>

<footer
    class={cn("px-5 py-4", className)}
    data-slot="frame-panel-footer"
    {...restProps}
>
    {@render children?.()}
</footer>

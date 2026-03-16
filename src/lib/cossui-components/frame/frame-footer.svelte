<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../../utils.js";

    // TODO extends React.ComponentProps<"footer">
    interface Props extends HTMLAttributes<HTMLDivElement> {
        children?: Snippet;
    }

    let { class: className, children, ...restProps }: Props = $props();
</script>

<div
    class={cn("px-5 py-4", className)}
    data-slot="frame-panel-footer"
    {...restProps}
>
    {@render children?.()}
</div>

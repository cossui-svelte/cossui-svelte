<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "$lib/utils.js";

  const groupVariants = cva(
    "flex w-fit *:focus-visible:z-1 *:has-focus-visible:z-1",
    {
      defaultVariants: { orientation: "horizontal" },
      variants: {
        orientation: {
          horizontal:
            "*:[[data-slot]~[data-slot]:not([data-slot=separator])]:before:-start-[0.5px] *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:-end-[0.5px] *:pointer-coarse:after:min-w-auto *:data-slot:has-[~[data-slot]]:rounded-e-none *:data-slot:has-[~[data-slot]]:border-e-0 *:[[data-slot]~[data-slot]]:rounded-s-none *:[[data-slot]~[data-slot]]:border-s-0",
          vertical:
            "flex-col *:pointer-coarse:after:min-h-auto *:data-slot:has-[~[data-slot]]:rounded-b-none *:data-slot:has-[~[data-slot]]:border-b-0 *:[[data-slot]~[data-slot]]:rounded-t-none *:[[data-slot]~[data-slot]]:border-t-0",
        },
      },
    },
  );

  type GroupVariants = VariantProps<typeof groupVariants>;

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: GroupVariants["orientation"];
    children?: Snippet;
  }

  let {
    class: className,
    orientation,
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(groupVariants({ orientation }), className)}
  data-orientation={orientation}
  data-slot="group"
  role="group"
  {...restProps}
>
  {@render children?.()}
</div>

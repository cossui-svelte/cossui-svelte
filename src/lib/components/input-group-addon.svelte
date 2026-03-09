<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "../utils.js";

  const inputGroupAddonVariants = cva(
    "[&_svg]:-mx-0.5 flex h-auto cursor-text select-none items-center justify-center gap-2 leading-none [&>kbd]:rounded-[calc(var(--radius)-5px)] not-has-[button]:**:[svg:not([class*='opacity-'])]:opacity-80",
    {
      defaultVariants: { align: "inline-start" },
      variants: {
        align: {
          "block-end":
            "order-last w-full justify-start px-[calc(--spacing(3)-1px)] pb-[calc(--spacing(3)-1px)]",
          "block-start":
            "order-first w-full justify-start px-[calc(--spacing(3)-1px)] pt-[calc(--spacing(3)-1px)]",
          "inline-end":
            "has-[>button]:-me-2 order-last pe-[calc(--spacing(3)-1px)]",
          "inline-start":
            "has-[>button]:-ms-2 order-first ps-[calc(--spacing(3)-1px)]",
        },
      },
    },
  );

  type InputGroupAddonVariants = VariantProps<typeof inputGroupAddonVariants>;

  interface Props extends HTMLAttributes<HTMLDivElement> {
    align?: InputGroupAddonVariants["align"];
    children?: Snippet;
  }

  let {
    class: className,
    align = "inline-start",
    children,
    ...restProps
  }: Props = $props();

  function handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest(
      "button, a, input, select, textarea, [role='button']",
    );
    if (isInteractive) return;
    e.preventDefault();
    const parent = (e.currentTarget as HTMLElement).parentElement;
    const input = parent?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea",
    );
    if (input && !parent?.querySelector("input:focus, textarea:focus")) {
      input.focus();
    }
  }
</script>

<div
  class={cn(inputGroupAddonVariants({ align }), className)}
  data-align={align}
  data-slot="input-group-addon"
  onmousedown={handleMouseDown}
  {...restProps}
>
  {@render children?.()}
</div>

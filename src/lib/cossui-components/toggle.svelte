<script lang="ts">
  import type { Snippet } from "svelte";
  import { Toggle } from "bits-ui";
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "../utils.js";

  const toggleVariants = cva(
    "[&_svg]:-mx-0.5 relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base text-foreground outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-[state=on]:bg-input/64 data-[state=on]:text-accent-foreground sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
      defaultVariants: { size: "default", variant: "default" },
      variants: {
        size: {
          default: "h-9 min-w-9 px-[calc(--spacing(2)-1px)] sm:h-8 sm:min-w-8",
          lg: "h-10 min-w-10 px-[calc(--spacing(2.5)-1px)] sm:h-9 sm:min-w-9",
          sm: "h-8 min-w-8 px-[calc(--spacing(1.5)-1px)] sm:h-7 sm:min-w-7",
        },
        variant: {
          default: "border-transparent",
          outline:
            "border-input bg-background not-dark:bg-clip-padding shadow-xs/5 not-disabled:not-active:not-data-[state=on]:before:shadow-[0_1px_--theme(--color-black/4%)] dark:bg-input/32 dark:data-[state=on]:bg-input dark:hover:bg-input/64 [:disabled,:active,[data-state=on]]:shadow-none",
        },
      },
    },
  );

  type ToggleVariants = VariantProps<typeof toggleVariants>;

  interface Props extends Toggle.RootProps {
    variant?: ToggleVariants["variant"];
    size?: ToggleVariants["size"];
    children?: Snippet;
  }

  let { class: className, variant, size, children, ...restProps }: Props = $props();
</script>

<Toggle.Root
  class={cn(toggleVariants({ className, size, variant }))}
  data-slot="toggle"
  {...restProps}
>
  {@render children?.()}
</Toggle.Root>

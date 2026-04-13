<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";
  const alertVariants = tv({
    base: "relative grid w-full items-start gap-x-2 gap-y-0.5 rounded-xl border px-3.5 py-3 text-card-foreground text-sm has-[>svg]:has-data-[slot=alert-action]:grid-cols-[calc(var(--spacing)*4)_1fr_auto] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-data-[slot=alert-action]:grid-cols-[1fr_auto] has-[>svg]:gap-x-2 [&>svg]:h-lh [&>svg]:w-4",
    variants: {
      variant: {
        default:
          "bg-transparent dark:bg-input/32 [&>svg]:text-muted-foreground",
        error:
          "border-destructive/32 bg-destructive/4 [&>svg]:text-destructive",
        info: "border-info/32 bg-info/4 [&>svg]:text-info",
        success: "border-success/32 bg-success/4 [&>svg]:text-success",
        warning: "border-warning/32 bg-warning/4 [&>svg]:text-warning",
      },
    },
    defaultVariants: { variant: "default" },
  });

  type AlertVariants = VariantProps<typeof alertVariants>;
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    variant = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariants["variant"];
  } = $props();
</script>

<div
  class={cn(alertVariants({ variant }), className)}
  data-slot="alert"
  role="alert"
  {...restProps}
>
  {@render children?.()}
</div>

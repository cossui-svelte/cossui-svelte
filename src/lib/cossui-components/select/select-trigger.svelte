<script lang="ts">
  import type { Snippet } from "svelte";
  import { Select } from "bits-ui";
  import { ChevronsUpDown } from "lucide-svelte";
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "../../utils.js";

  const selectTriggerVariants = cva(
    "relative inline-flex min-h-9 w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-left text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:not-data-[state=open]:before:shadow-[0_1px_--theme(--color-black/4%)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:aria-invalid:ring-destructive/24",
    {
      defaultVariants: { size: "default" },
      variants: {
        size: {
          default: "",
          lg: "min-h-10 sm:min-h-9",
          sm: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7",
        },
      },
    },
  );

  type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

  interface Props extends Select.TriggerProps {
    size?: SelectTriggerVariants["size"];
    children?: Snippet;
  }

  let { class: className, size, children, ...restProps }: Props = $props();
</script>

<Select.Trigger
  class={cn(selectTriggerVariants({ size }), className)}
  data-slot="select-trigger"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <Select.Value
      class="flex-1 truncate data-[placeholder]:text-muted-foreground/72"
      data-slot="select-value"
    />
  {/if}
  <ChevronsUpDown class="-me-1 size-4.5 opacity-80 sm:size-4" />
</Select.Trigger>

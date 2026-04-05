<script lang="ts">
  import type { Snippet } from "svelte";
  import { Button } from "bits-ui";
  import { cn } from "$lib/utils";
  import { buttonVariants, type ButtonVariants } from "./button-variants";

  interface ButtonProps {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: string;
    children?: Snippet;
  }

  let {
    class: className,
    variant,
    size,
    children,
    ...restProps
  }: Button.RootProps & ButtonProps = $props();
</script>

<Button.Root
  class={cn(buttonVariants({ variant, size }), className)}
  data-slot="button"
  {...restProps}
>
  {@render children?.()}
</Button.Root>

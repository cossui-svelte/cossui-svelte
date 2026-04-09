<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner";
  import type { Snippet } from "svelte";
  import { Button } from "bits-ui";
  import { cn } from "$lib/utils";
  import { buttonVariants, type ButtonVariants } from "./button-variants";

  interface ButtonProps {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: string;
    children?: Snippet;
    loading?: boolean;
  }

  let {
    class: className,
    variant,
    size,
    children,
    loading,
    ...restProps
  }: Button.RootProps & ButtonProps = $props();
</script>

<Button.Root
  class={cn(buttonVariants({ variant, size }), className)}
  data-slot="button"
  {...restProps}
>
  {#if loading === true}
    <Spinner />
  {:else}
    {@render children?.()}
  {/if}
</Button.Root>

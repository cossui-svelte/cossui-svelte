<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner";
  import { Button } from "bits-ui";
  import { cn } from "$lib/utils";
  import {
    buttonVariants,
    type ButtonSize,
    type ButtonVariant,
  } from "./button-variants";
  import type { Snippet } from "svelte";

  let {
    class: className,
    variant,
    size,
    children,
    loading,
    ...restProps
  }: Button.RootProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    class?: string;
    children?: Snippet;
    loading?: boolean;
  } = $props();
</script>

<Button.Root
  class={cn(buttonVariants({ variant, size }), className)}
  data-slot="button"
  {...restProps}
>
  {#if loading === true}
    <Spinner /> {@render children?.()}
  {:else}
    {@render children?.()}
  {/if}
</Button.Root>

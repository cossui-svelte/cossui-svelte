<script lang="ts">
  import { Button } from "bits-ui";
  import type { Snippet } from "svelte";
  import { Spinner } from "$lib/components/ui/spinner";
  import { cn } from "$lib/utils";
  import {
    type ButtonSize,
    type ButtonVariant,
    buttonVariants,
  } from "./button-variants";

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
  class={cn(buttonVariants({ size , variant}), className)}
  data-slot="button"
  {...restProps}
>
  {#if loading === true}
    <Spinner /> {@render children?.()}
  {:else}
    {@render children?.()}
  {/if}
</Button.Root>

<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner";
  import { Button } from "bits-ui";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "./button-variants";
  import type { ButtonProps } from ".";

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

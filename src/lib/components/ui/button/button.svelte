<script lang="ts">
import type { Button } from 'bits-ui';
import { Spinner } from '$lib/components/ui/spinner';
import { cn } from '$lib/utils';
import type { ButtonProps } from '.';
import { buttonVariants } from './button-variants';

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
    <Spinner /> {@render children?.()}
  {:else}
    {@render children?.()}
  {/if}
</Button.Root>

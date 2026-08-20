<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.Empty>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Empty
  class={cn('not-empty:py-6 text-center text-base text-muted-foreground sm:text-sm', className)}
  data-slot="command-empty"
  {...restProps}
>
  {@render children?.()}
</AutocompletePrimitive.Empty>

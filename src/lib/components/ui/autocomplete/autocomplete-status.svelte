<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.Status>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Status
  class={cn('px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0', className)}
  data-slot="autocomplete-status"
  {...restProps}
>
  {@render children?.()}
</AutocompletePrimitive.Status>

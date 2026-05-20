<script lang="ts">
import '@aejkatappaja/phantom-ui';
import type { PhantomUiAttributes } from '@aejkatappaja/phantom-ui';
import type { Snippet } from 'svelte';

let {
  children,
  ...restProps
}: PhantomUiAttributes & {
  children: Snippet;
} = $props();
</script>

<phantom-ui data-slot="skeleton" {...restProps}>
  {@render children?.()}
</phantom-ui>

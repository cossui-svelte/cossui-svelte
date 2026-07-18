<script lang="ts">
  import { box } from 'svelte-toolbelt';
  import { useControl } from '$lib/components/ui/form/form-field-state.svelte.js';
  import { useId } from '$lib/components/ui/form/internal/id';
  import type { ControlProps } from './types.js';

  let { id = useId(), children }: ControlProps = $props();

  const controlState = useControl({
    id: box.with(() => id)
  });
</script>
  
{@render children?.({ props: controlState.props })}

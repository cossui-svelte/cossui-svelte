<script lang="ts">
  import * as CalendarPrimitive from './internal';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow bind:ref class={cn('flex', className)} {...restProps} />

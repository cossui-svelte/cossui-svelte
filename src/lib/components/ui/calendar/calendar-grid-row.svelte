<script lang="ts">
  import { cn } from '$lib/utils';
  import * as CalendarPrimitive from './internal';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow bind:ref class={cn('flex', className)} {...restProps} />

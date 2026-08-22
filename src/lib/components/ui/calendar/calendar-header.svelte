<script lang="ts">
  import { cn } from '$lib/utils';
  import * as CalendarPrimitive from './internal';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header
  bind:ref
  class={cn(
    'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
    className
  )}
  {...restProps}
/>

<script lang="ts">
  import { cn } from '$lib/utils';
  import * as CalendarPrimitive from './internal';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
  bind:ref
  class={cn(
    'text-muted-foreground w-(--cell-size) rounded-md text-[0.8rem] font-normal',
    className
  )}
  {...restProps}
/>

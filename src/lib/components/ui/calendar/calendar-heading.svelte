<script lang="ts">
  import { cn } from '$lib/utils';
  import * as CalendarPrimitive from './internal';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.HeadingProps = $props();
</script>

<CalendarPrimitive.Heading
  bind:ref
  class={cn('px-(--cell-size) text-sm font-medium', className)}
  {...restProps}
/>

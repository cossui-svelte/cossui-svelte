<script lang="ts">
  import * as CalendarPrimitive from './internal';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.GridHeadProps = $props();
</script>

<CalendarPrimitive.GridHead bind:ref class={cn(className)} {...restProps} />

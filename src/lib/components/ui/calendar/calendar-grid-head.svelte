<script lang="ts">
  import { cn } from '$lib/utils';
  import * as CalendarPrimitive from './internal';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.GridHeadProps = $props();
</script>

<CalendarPrimitive.GridHead bind:ref class={cn(className)} {...restProps} />

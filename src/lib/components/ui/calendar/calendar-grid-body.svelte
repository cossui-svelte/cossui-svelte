<script lang="ts">
  import { cn } from '$lib/utils';
  import * as CalendarPrimitive from './internal';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.GridBodyProps = $props();
</script>

<CalendarPrimitive.GridBody bind:ref class={cn(className)} {...restProps} />

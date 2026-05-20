<script lang="ts">
import type { Combobox } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

type Props = Combobox.ItemProps & { children?: Snippet };

let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Item
  class={cn(
    "grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-64 sm:min-h-7 sm:text-sm",
    className,
  )}
  data-slot="combobox-item"
  {...restProps}
>
  <Combobox.ItemIndicator class="col-start-1">
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
    </svg>
  </Combobox.ItemIndicator>
  <span class="col-start-2">{@render children?.()}</span>
</Combobox.Item>

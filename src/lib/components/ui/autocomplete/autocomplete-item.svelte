<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Combobox.ItemProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Item
  class={cn(
    "flex min-h-8 cursor-default select-none items-center rounded-sm px-2 py-1 text-base outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-64 sm:min-h-7 sm:text-sm",
    className,
  )}
  data-slot="autocomplete-item"
  {...restProps}
>
  {@render children?.()}
</Combobox.Item>

<script lang="ts" generics="T extends Record<string, unknown>">
  import type { HTMLFormAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils";
  import { setFormContext } from "./form-context.svelte";
  import { type SuperForm } from "sveltekit-superforms";

  let {
    ref = $bindable(null),
    class: className,
    children,
    config,
    ...restProps
  }: WithElementRef<
    HTMLFormAttributes & {
      config: SuperForm<T>;
    }
  > = $props();

  setFormContext(config);
</script>

<form
  bind:this={ref}
  use:config.enhance
  method="POST"
  class={cn("flex w-full flex-col gap-4", className)}
  data-slot="form"
  novalidate
  {...restProps}
>
  {@render children?.()}
</form>

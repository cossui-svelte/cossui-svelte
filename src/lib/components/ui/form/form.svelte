<script lang="ts" generics="T extends Record<string, unknown>">
  import type { HTMLFormAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import { setFormContext } from "./form-context.svelte";
  import { type SuperForm } from "sveltekit-superforms";

  let {
    ref = $bindable(null),
    class: className,
    children,
    form,
    ...restProps
  }: WithElementRef<
    HTMLFormAttributes & {
      form: SuperForm<T>;
    }
  > = $props();

  setFormContext(form);
</script>

<form
  bind:this={ref}
  use:form.enhance
  method="POST"
  class={cn("flex w-full flex-col gap-4", className)}
  data-slot="form"
  novalidate
  {...restProps}
>
  {@render children?.()}
</form>

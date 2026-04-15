<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
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
    HTMLAttributes<HTMLFormElement> & {
      form: SuperForm<Record<string, unknown>>;
    }
  > = $props();

  setFormContext(form);
</script>

<form
  bind:this={ref}
  use:form.enhance
  class={cn("flex w-full flex-col gap-4", className)}
  data-slot="form"
  {...restProps}
>
  {@render children?.()}
</form>

<script lang="ts" generics="T extends Record<string, unknown>">
  import type { WithElementRef } from "bits-ui";
  import type { HTMLFormAttributes } from "svelte/elements";
  import type { SuperForm } from "sveltekit-superforms";
  import { setFormContext } from "./form-context.svelte";

  let {
    ref = $bindable(null),
    class: className,
    children,
    superform,
    onsubmit: _onsubmit,
    ...restProps
  }: WithElementRef<
    HTMLFormAttributes & {
      superform: SuperForm<T>;
    }
  > = $props();

   setFormContext(superform);
</script>

<form
  bind:this={ref}
  use:superform.enhance
  method="POST"
  class={className}
  data-slot="form"
  novalidate
  {...restProps}
>
  {@render children?.()}
</form>

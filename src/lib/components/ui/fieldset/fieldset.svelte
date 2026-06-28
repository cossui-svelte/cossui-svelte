<script lang="ts" generics="T extends Record<string, unknown>">
  import type { ComponentProps, Snippet } from "svelte";
  import { Fieldset } from "$lib/formsnap";
  import { uid } from "$lib/hooks/use-uid";
  import { cn } from "$lib/utils";
  import { getFormContext } from "../form/form-context.svelte";

  let {
    ref = $bindable(null),
    class: className,
    name = uid(),
    children,
    ...restProps
  }: Omit<ComponentProps<typeof Fieldset>, "form" | "name"> & {
    children: Snippet;
    name?: string;
  } = $props();

  const form = getFormContext();
</script>

<Fieldset
  bind:ref
  {form}
  data-slot="fieldset"
  {name}
  class={cn("flex w-full max-w-64 flex-col gap-6", className)}
  {...restProps}
>
  {@render children?.()}
</Fieldset>

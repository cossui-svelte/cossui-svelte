<script lang="ts">
  import { type ComponentProps } from "svelte";
  import { Field } from "$lib/formsnap";
  import { uid } from "$lib/hooks/use-uid";
  import { cn } from "$lib/utils";
  import { getFormContext } from "../form/form-context.svelte";

  let {
    class: className,
    name = uid(),
    children: childrenProp,
    ...restProps
  }: Omit<ComponentProps<typeof Field>, "form"|"name"> & {
    class?: string;
    name?: string;
  } = $props();

  const form = getFormContext();
</script>

<Field {form} {name}>
  {#snippet children(snippetProps)}
    <div
      role="group"
      data-slot="field"
      class={cn("flex flex-col items-start gap-2", className)}
      {...restProps}
    >
      {@render childrenProp?.(snippetProps)}
    </div>
  {/snippet}
</Field>

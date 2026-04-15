<script lang="ts">
  import type { FormPath } from "sveltekit-superforms";
  import { Field, type FieldProps, type FsSuperForm } from "formsnap";
  import { cn } from "$lib/utils.js";
  import { type ComponentProps } from "svelte";
  import { getFormContext } from "../form/form-context.svelte";

  let {
    class: className,
    name,
    children: childrenProp,
    ...restProps
  }: Omit<ComponentProps<typeof Field>, "form"> & {
    class?: string;
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

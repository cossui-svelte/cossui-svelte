<script lang="ts" module>
  import type { FormPath } from "sveltekit-superforms";

  // the form object
  type T = Record<string, unknown>;
  // the path/name of the field in the form object
  type U = unknown;
</script>

<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPath<T>"
>
  import { Field, type FieldProps } from "formsnap";
  import { cn } from "$lib/utils.js";

  let {
    class: className,
    form,
    name,
    children: childrenProp,
    ...restProps
  }: FieldProps<T, U> & { class: string } = $props();

  // let {
  //   class: className,
  //   children,
  //   ...restProps
  // }: ComponentProps<typeof Field> & {
  //   class: string;
  //   "data-slot"?: string;
  //   children?: Snippet;
  // } = $props();
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

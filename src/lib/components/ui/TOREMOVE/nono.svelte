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
    import { Field, type FieldProps, FieldErrors } from "formsnap";
    import type { SuperForm } from "sveltekit-superforms";

    let { form, name, children: childrenProp }: FieldProps<T, U> = $props();
</script>

<Field {form} {name}>
    {#snippet children(snippetProps)}
        {@render childrenProp?.(snippetProps)}
        <FieldErrors />
    {/snippet}
</Field>

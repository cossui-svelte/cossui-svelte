<script lang="ts">
    import { Field, Control, Label, FieldErrors, Description } from "formsnap";
    import { signupFormSchema } from "./schema.js";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { superForm } from "sveltekit-superforms";
    let { data } = $props();

    const form = superForm(data.form, {
        validators: zodClient(signupFormSchema),
    });
    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Field {form} name="name">
        <Control>
            {#snippet children({ props })}
                <Label>Name</Label>
                <input {...props} bind:value={$formData.name} />
            {/snippet}
        </Control>
        <Description>Be sure to use your real name.</Description>
        <FieldErrors />
    </Field>
    <Field {form} name="email">
        <Control>
            {#snippet children({ props })}
                <Label>Email</Label>
                <input {...props} type="email" bind:value={$formData.email} />
            {/snippet}
        </Control>
        <Description
            >It's preferred that you use your company email.</Description
        >
        <FieldErrors />
    </Field>
    <Field {form} name="password">
        <Control>
            {#snippet children({ props })}
                <Label>Password</Label>
                <input
                    {...props}
                    type="password"
                    bind:value={$formData.password}
                />
            {/snippet}
        </Control>
        <Description>Ensure the password is at least 10 characters.</Description
        >
        <FieldErrors />
    </Field>
</form>

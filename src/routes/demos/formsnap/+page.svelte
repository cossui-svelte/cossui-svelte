<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { valibotClient } from "sveltekit-superforms/adapters";
    import { Field, Control, Label, FieldErrors } from "$lib/formsnap";
    import { userSchema } from "./schema";

    let { data } = $props();

    const sf = superForm(data.form, {
        SPA: true,
        validators: valibotClient(userSchema),
        validationMethod: "oninput",
        scrollToError: "smooth",
        resetForm: true,
        onUpdated({ form }) {
            if (form.valid) {
                alert("Form submitted successfully!");
            }
        },
    });

    const { form, enhance, submitting, delayed } = sf;
</script>

<main>
    <h1>Register</h1>

    <form method="POST" use:enhance novalidate>
        <Field form={sf} name="name">
            <Label>Name</Label>
            <Control>
                {#snippet children({ props })}
                    <input type="text" bind:value={$form.name} {...props} />
                {/snippet}
            </Control>
            <FieldErrors />
        </Field>

        <Field form={sf} name="email">
            <Control>
                {#snippet children({ props })}
                    <Label>Email</Label>
                    <input type="email" bind:value={$form.email} {...props} />
                {/snippet}
            </Control>
            <FieldErrors />
        </Field>

        <Field form={sf} name="age">
            <Control>
                {#snippet children({ props })}
                    <Label>Age</Label>
                    <input type="number" bind:value={$form.age} {...props} />
                {/snippet}
            </Control>
            <FieldErrors />
        </Field>

        <Field form={sf} name="password">
            <Control>
                {#snippet children({ props })}
                    <Label>Password</Label>
                    <input
                        type="password"
                        bind:value={$form.password}
                        {...props}
                    />
                {/snippet}
            </Control>
            <FieldErrors />
        </Field>

        <Field form={sf} name="confirmPassword">
            <Control>
                {#snippet children({ props })}
                    <Label>Confirm Password</Label>
                    <input
                        type="password"
                        bind:value={$form.confirmPassword}
                        {...props}
                    />
                {/snippet}
            </Control>
            <FieldErrors />
        </Field>

        <button type="submit" disabled={$submitting}>
            {$delayed ? "Submitting…" : "Submit"}
        </button>
    </form>
</main>

<style>
    main {
        max-width: 480px;
        margin: 3rem auto;
        font-family: sans-serif;
        padding: 0 1rem;
    }

    h1 {
        margin-bottom: 1.5rem;
    }

    :global([data-fs-field]) {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 1.25rem;
    }

    :global([data-fs-label]) {
        font-weight: 600;
        font-size: 0.9rem;
    }

    input {
        padding: 0.5rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
    }

    input[aria-invalid="true"] {
        border-color: crimson;
    }

    :global([data-fs-field-errors]) {
        color: crimson;
        font-size: 0.82rem;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.6rem 1.5rem;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>

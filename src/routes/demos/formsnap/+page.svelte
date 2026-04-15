<script lang="ts">
    import {
        Field,
        FieldControl,
        FieldLabel,
        FieldDescription,
        FieldError,
    } from "$lib/components/ui/field";
    import { Fieldset, FieldsetLegend } from "$lib/components/ui/fieldset";
    import { allergies, schema, themes } from "./schema.js";
    import { Form, FormDebug } from "$lib/components/ui/form";
    import { defaults, superForm } from "sveltekit-superforms";
    import { zod4, zod4Client } from "sveltekit-superforms/adapters";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import CheckboxGroup from "$lib/components/ui/checkbox-group/checkbox-group.svelte";
    import { Radio } from "$lib/components/ui/radio-group/index.js";
    import RadioGroup from "$lib/components/ui/radio-group/radio-group.svelte";

    const formConfig = superForm(defaults(zod4(schema)), {
        validators: zod4Client(schema),
        SPA: true,
        onUpdate: ({ form: f }) => {
            console.log(f.valid);
        },
    });

    // get the formData store
    const { form: formData } = formConfig;
</script>

<Form form={formConfig} class="mx-auto flex max-w-md flex-col" method="post">
    <Field name="email">
        <FieldControl>
            {#snippet children({ props })}
                <FieldLabel>Email</FieldLabel>
                <Input {...props} type="email" bind:value={$formData.email} />
            {/snippet}
        </FieldControl>
        <FieldDescription>Company email is preferred</FieldDescription>
        <FieldError />
    </Field>
    <Field name="bio">
        <FieldControl>
            {#snippet children({ props })}
                <FieldLabel>Bio</FieldLabel>
                <Textarea {...props} bind:value={$formData.bio} />
            {/snippet}
        </FieldControl>
        <FieldDescription>Tell us a bit about yourself.</FieldDescription>
        <FieldError />
    </Field>
    <Field name="language">
        <FieldControl>
            {#snippet children({ props })}
                <FieldLabel>Language</FieldLabel>
                <select {...props} bind:value={$formData.language}>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="en">English</option>
                </select>
            {/snippet}
        </FieldControl>
        <FieldDescription>Help us address you properly.</FieldDescription>
        <FieldError />
    </Field>
    <Fieldset name="theme">
        <FieldsetLegend>Select your theme</FieldsetLegend>
        <RadioGroup>
            {#each themes as theme}
                <FieldControl>
                    {#snippet children({ props })}
                        <FieldLabel>{theme}</FieldLabel>
                        <Radio
                            {...props}
                            value={theme}
                            // bind:group={$formData.theme}
                        />
                    {/snippet}
                </FieldControl>
            {/each}
        </RadioGroup>
        <FieldDescription
            >We prefer dark mode, but the choice is yours.</FieldDescription
        >
        <FieldError />
    </Fieldset>
    <Field name="marketingEmails">
        <FieldControl>
            {#snippet children({ props })}
                <Checkbox {...props} bind:checked={$formData.marketingEmails} />
                <FieldLabel>I want to receive marketing emails</FieldLabel>
            {/snippet}
        </FieldControl>
        <FieldDescription
            >Stay up to date with our latest news and offers.</FieldDescription
        >
        <FieldError />
    </Field>
    <Fieldset name="allergies">
        <FieldsetLegend>Food allergies</FieldsetLegend>
        <CheckboxGroup aria-label="Select frameworks" value={["next"]}>
            {#each allergies as allergy}
                <FieldControl>
                    {#snippet children({ props })}
                        <Checkbox
                            {...props}
                            // bind:group={$formData.allergies}
                            value={allergy}
                        />
                        <FieldLabel>{allergy}</FieldLabel>
                    {/snippet}
                </FieldControl>
            {/each}
        </CheckboxGroup>
        <FieldDescription
            >When we provide lunch, we'll accommodate your needs.</FieldDescription
        >
        <FieldError />
    </Fieldset>
    <Button>Submit</Button>
</Form>
<FormDebug {formData} />

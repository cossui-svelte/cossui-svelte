<script lang="ts">
import { superForm } from 'sveltekit-superforms';
import { valibotClient } from 'sveltekit-superforms/adapters';
import ComponentPreviewTabs from '$lib/components/app/component-preview-tabs.svelte';
import { Button } from '$lib/components/ui/button';
import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
import { Form } from '$lib/components/ui/form';
import { Input } from '$lib/components/ui/input';
import { schema } from './schema';

let { data } = $props();

const formConfig = superForm(data.form, {
  delayMs: 500,
  async onUpdated({ form }) {
    if (form.valid) {
      await sleep(1000);
      // alert("Form submitted successfully!");
    }
  },
  resetForm: true,
  SPA: true,
  scrollToError: 'smooth',
  timeoutMs: 8000,
  validationMethod: 'oninput',
  validators: valibotClient(schema)
});

const { form: formData, submitting, delayed } = formConfig;
</script>

<ComponentPreviewTabs>
    <Form config={formConfig} class="max-w-64">
        <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" bind:value={$formData.email} />
            <FieldError />
        </Field>
        <Button type="submit" disabled={$submitting} loading={$submitting}>
            {$delayed ? "Submitting…" : "Submit"}
        </Button>
    </Form>
</ComponentPreviewTabs>

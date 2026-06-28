<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Textarea } from "$lib/components/ui/textarea";

  let loading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Message: ${formData.get("message") || ""}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {onsubmit}>
  <Field>
    <FieldLabel>Message</FieldLabel>
    <Textarea name="message" placeholder="Type your message here" required />
    <FieldError>This field is required.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>

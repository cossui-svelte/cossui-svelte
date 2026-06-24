<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";

  let loading = $state(false);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    const accepted = formData.get("terms");
    alert(`Terms: ${accepted}`);
  }
</script>

<Form class="flex w-auto flex-col gap-4" {onsubmit}>
  <Field name="terms">
    <FieldLabel>
      <Checkbox checked value="yes" />
      Accept terms and conditions
    </FieldLabel>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { CheckboxGroup } from "$lib/components/ui/checkbox-group";
  import { FieldItem, FieldLabel } from "$lib/components/ui/field";
  import { Fieldset, FieldsetLegend } from "$lib/components/ui/fieldset";
  import { Form } from "$lib/components/ui/form";

  let loading = $state(false);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    const frameworks = formData.getAll("frameworks") as string[];
    alert(`Selected: ${frameworks.join(", ") || "none"}`);
  }
</script>

<Form class="flex w-full max-w-[160px] flex-col gap-4" {onsubmit}>
  <Fieldset>
    <FieldsetLegend class="font-medium text-sm">Frameworks</FieldsetLegend>
    <CheckboxGroup value={["next"]}>
      <FieldItem>
        <FieldLabel>
          <Checkbox value="next" />
          Next.js
        </FieldLabel>
      </FieldItem>
      <FieldItem>
        <FieldLabel>
          <Checkbox value="vite" />
          Vite
        </FieldLabel>
      </FieldItem>
      <FieldItem>
        <FieldLabel>
          <Checkbox value="astro" />
          Astro
        </FieldLabel>
      </FieldItem>
    </CheckboxGroup>
  </Fieldset>
  <Button {loading} type="submit">Submit</Button>
</Form>

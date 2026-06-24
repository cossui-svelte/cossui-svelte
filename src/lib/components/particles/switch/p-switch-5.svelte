<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Switch } from "$lib/components/ui/switch";

  let loading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    const enabled = formData.get("marketing");
    alert(`Marketing emails: ${enabled}`);
  }
</script>

<form class="flex flex-col gap-4" onsubmit={handleSubmit}>
  <Label>
    <Switch name="marketing" defaultChecked />
    Enable marketing emails
  </Label>
  <Button {loading} type="submit">Submit</Button>
</form>

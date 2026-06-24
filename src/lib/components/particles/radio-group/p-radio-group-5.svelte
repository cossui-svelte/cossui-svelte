<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Radio, RadioGroup } from "$lib/components/ui/radio-group";

  let loading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Selected: ${formData.get("frameworks")}`);
  }
</script>

<form class="flex w-full max-w-[160px] flex-col gap-4" onsubmit={handleSubmit}>
  <fieldset class="flex w-full flex-col gap-2">
    <legend class="font-medium text-sm">Frameworks</legend>
    <RadioGroup name="frameworks" value="next">
      <Label><Radio value="next" /> Next.js</Label>
      <Label><Radio value="vite" /> Vite</Label>
      <Label><Radio value="astro" /> Astro</Label>
    </RadioGroup>
  </fieldset>
  <Button {loading} type="submit">Submit</Button>
</form>

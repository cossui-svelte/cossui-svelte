<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "$lib/components/ui/select";

  const items = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Astro", value: "astro" },
  ];

  let loading = $state(false);
  let selected = $state("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Framework: ${formData.get("framework") || ""}`);
  }
</script>

<form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <div class="flex flex-col gap-1.5">
    <label class="text-sm font-medium" for="framework-select">Framework</label>
    <Select
      aria-label="Select framework"
      name="framework"
      required
      value={selected}
      onValueChange={(v) => { selected = v; }}
    >
      <SelectTrigger id="framework-select">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectPopup>
        {#each items as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <p class="text-muted-foreground text-sm">Pick your favorite.</p>
  </div>
  <Button {loading} type="submit">Submit</Button>
</form>

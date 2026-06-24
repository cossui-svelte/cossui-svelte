<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Slider } from "$lib/components/ui/slider";

  let loading = $state(false);
  let value = $state<number | number[]>([25, 75]);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    const volumes = formData.getAll("volume");
    alert(`Volume: ${volumes.join(", ")}`);
  }

  const displayValue = $derived(
    Array.isArray(value) ? value.join(" – ") : value,
  );
</script>

<form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <fieldset class="flex w-full flex-col items-stretch gap-3 border-0 p-0 m-0">
    <div class="flex flex-col gap-3">
      <div class="mb-2 flex items-center justify-between gap-1">
        <legend class="text-sm font-medium">Volume</legend>
        <span class="tabular-nums text-sm">{displayValue}</span>
      </div>
      <Slider name="volume" bind:value />
      <p class="text-muted-foreground text-sm">Choose a value between 0 and 100</p>
    </div>
  </fieldset>
  <Button {loading} type="submit">Submit</Button>
</form>

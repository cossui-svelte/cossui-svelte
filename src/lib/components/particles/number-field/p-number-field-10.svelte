<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
  } from "$lib/components/ui/number-field";

  let quantity = $state(1);
  let loading = $state(false);
  let error = $state("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    if (quantity < 1) { error = "Quantity must be at least 1."; return; }
    if (quantity > 100) { error = "Maximum quantity is 100."; return; }
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Quantity: ${quantity}`);
  }
</script>

<form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <div class="flex flex-col items-start gap-2">
    <NumberField bind:value={quantity} max={100} min={1}>
      <NumberFieldScrubArea label="Quantity" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
    {#if error}
      <p class="text-destructive text-xs">{error}</p>
    {/if}
  </div>
  <Button {loading} type="submit">Submit</Button>
</form>

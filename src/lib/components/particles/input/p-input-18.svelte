<script lang="ts">
  import { Input } from "$lib/components/ui/input";

  const maxLength = 14;
  let value = $state("");
</script>

<div class="flex flex-col items-start gap-2">
  <Input
    aria-label="Code"
    maxlength={maxLength}
    oninput={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
    placeholder="Enter code"
    type="text"
    {value}
  />
  <p class="text-muted-foreground text-xs">
    <span class="tabular-nums">{maxLength - value.length}</span> characters left
  </p>
</div>

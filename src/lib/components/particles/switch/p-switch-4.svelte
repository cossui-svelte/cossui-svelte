<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Switch } from "$lib/components/ui/switch";

  let checked = $state(true);
</script>

<Label
  class="flex items-center gap-6 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
  for="notifications"
>
  <div class="flex flex-col gap-1">
    <p>Enable notifications</p>
    <p class="text-muted-foreground text-xs">
      You can enable or disable notifications at any time.
    </p>
  </div>
  <Switch
    class="[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]"
    id="notifications"
    bind:checked
  />
</Label>

<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";
</script>

<Label class="flex items-start gap-2 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
  <Checkbox checked />
  <div class="flex flex-col gap-1">
    <p>Enable notifications</p>
    <p class="text-muted-foreground text-xs">
      You can enable or disable notifications at any time.
    </p>
  </div>
</Label>

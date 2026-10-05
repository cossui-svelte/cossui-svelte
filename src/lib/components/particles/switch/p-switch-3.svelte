<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';

  let checked = $state(true);
</script>

<div class="flex items-start gap-2">
  <Switch id="marketing" bind:checked />
  <div class="flex flex-col gap-1">
    <Label for="marketing">Marketing emails</Label>
    <p class="text-muted-foreground text-xs">
      By enabling marketing emails, you agree to receive emails.
    </p>
  </div>
</div>

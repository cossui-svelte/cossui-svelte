<script lang="ts">
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';

  let enabled = $state(false);

  function handleToggle(checked: boolean) {
    toastManager.add({
      title: checked ? 'Notifications enabled successfully' : 'Notifications disabled successfully',
      type: 'success'
    });
  }
</script>

<Field>
  <FieldLabel>
    <Switch bind:checked={enabled} onCheckedChange={handleToggle} />
    Allow browser notifications
  </FieldLabel>
</Field>

<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';

  let enabled = $state(false);

  function handleToggle() {
    toastManager.add({
      title: 'Profile updated successfully',
      type: 'success'
    });
  }
</script>

<Field>
  <FieldLabel class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
    <Switch bind:checked={enabled} onCheckedChange={handleToggle} />
    <span>User impersonation</span>
    <FieldDescription class="col-start-2 font-normal">
      Allows our support team to temporarily sign in as you to help us quickly resolve any issues
      you report to us.
    </FieldDescription>
  </FieldLabel>
</Field>

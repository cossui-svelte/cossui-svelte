<script lang="ts">
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import { SettingsToggle } from '../../../../components/particles/index.js';

  let autoOptIn = $state(false);

  function handleToggle(checked: boolean) {
    autoOptIn = checked;
    toastManager.add({
      title: 'Settings updated successfully',
      type: 'success'
    });
  }
</script>

<SettingsToggle
  checked={autoOptIn}
  description="Automatically opt into new experimental features, unless disabled by your team or organization"
  onCheckedChange={handleToggle}
  title="Automatically opt-in for future experimental features"
/>

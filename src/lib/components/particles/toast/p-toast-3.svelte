<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
</script>

<Button
  onclick={() => {
    toastManager.add({
      description: 'Please wait while we process your request.',
      title: 'Loading…',
      type: 'loading'
    });
  }}
  variant="outline"
>
  Loading Toast
</Button>

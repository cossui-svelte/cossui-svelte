<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { toastManager } from '$lib/components/ui/toast';
</script>

<Button
  onclick={() => {
    const id = toastManager.add({
      actionProps: {
        children: 'Undo',
        onclick: () => {
          toastManager.close(id);
          toastManager.add({
            description: 'The action has been reverted.',
            title: 'Action undone',
            type: 'info'
          });
        }
      },
      description: 'You can undo this action.',
      timeout: 1000000,
      title: 'Action performed',
      type: 'success'
    });
  }}
  variant="outline"
>
  Perform Action
</Button>

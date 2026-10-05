<script lang="ts">
  import type { Row } from '@tanstack/svelte-table';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import type { DashboardTableFeatures } from './data-table-features.js';
  import type { Schema } from './schemas.js';

  let { row }: { row: Row<DashboardTableFeatures, Schema> } = $props();
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    toastManager.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: { title: `Saving ${row.original.header}` },
      success: { title: 'Done' },
      error: { title: 'Error' }
    });
  }}
>
  <Label for="{row.original.id}-limit" class="sr-only">Limit</Label>
  <Input
    class="h-8 w-16 border-transparent bg-transparent text-end shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
    value={row.original.limit}
    id="{row.original.id}-limit"
  />
</form>

<script lang="ts">
  import type { Row } from '@tanstack/svelte-table';
  import { Badge } from '$lib/components/ui/badge';
  import type { DashboardTableFeatures } from './data-table-features.js';
  import type { Schema } from './schemas.js';

  let { row }: { row: Row<DashboardTableFeatures, Schema> } = $props();
</script>

<div class="w-32">
  <Badge variant="outline" class="px-1.5 text-muted-foreground">
    {row.original.type}
  </Badge>
</div>

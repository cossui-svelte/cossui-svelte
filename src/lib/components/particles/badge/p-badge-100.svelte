<script lang="ts">
  import Bell from '@lucide/svelte/icons/bell';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';

  let count = $state(3);
</script>

<Button
  aria-label="Notifications"
  class="relative"
  onclick={() => (count = 0)}
  size="icon"
  type="button"
  variant="outline"
>
  <Bell aria-hidden="true" />
  {#if count > 0}
    <Badge class="-top-2 -translate-x-1/2 absolute left-full min-w-5 px-1">
      {count > 99 ? '99+' : count}
    </Badge>
  {/if}
</Button>

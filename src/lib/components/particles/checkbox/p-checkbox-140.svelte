<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();
</script>

<div class="flex items-center justify-between gap-2">
  <Checkbox class="order-1" {id} />
  <Label for={id}>Right aligned checkbox</Label>
</div>

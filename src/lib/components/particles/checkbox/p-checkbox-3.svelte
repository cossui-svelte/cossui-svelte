<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";

  const id = $props.id();
</script>

<div class="flex items-start gap-2">
  <Checkbox checked {id} />
  <div class="flex flex-col gap-1">
    <Label for={id}>Accept terms and conditions</Label>
    <p class="text-muted-foreground text-xs">
      By clicking this checkbox, you agree to the terms and conditions.
    </p>
  </div>
</div>

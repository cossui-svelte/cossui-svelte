<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();
</script>

<div
  class="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
>
  <Checkbox aria-describedby="{id}-description" class="order-1 after:absolute after:inset-0" {id} />
  <div class="grid grow gap-2">
    <Label for={id}>
      Label
      <span class="font-normal text-muted-foreground text-xs leading-[inherit]">(Sublabel)</span>
    </Label>
    <p class="text-muted-foreground text-xs" id="{id}-description">
      A short description goes here.
    </p>
  </div>
</div>

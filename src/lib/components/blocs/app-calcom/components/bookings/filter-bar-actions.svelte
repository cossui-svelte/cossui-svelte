<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    onClear,
    onSave
  }: {
    class?: string;
    onClear: () => void;
    onSave?: () => void;
  } = $props();
</script>

<div class={cn('ms-auto flex items-center gap-1', className)}>
  <Button onclick={onClear} size="xs" variant="ghost">Clear</Button>
  <Button onclick={() => onSave?.()} size="xs" variant="outline">Save</Button>
</div>

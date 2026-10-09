<script lang="ts">
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { PERMISSION_DETAILS, type RowId } from './permissions-data.js';

  let {
    disabled,
    grantIds,
    onGrantChange,
    rowId
  }: {
    disabled: boolean;
    grantIds: string[];
    onGrantChange: (grantId: string, checked: boolean) => void;
    rowId: RowId;
  } = $props();

  const baseId = $props.id();
  const grants = $derived(PERMISSION_DETAILS[rowId].grants);
</script>

<div class="flex flex-col gap-3 py-1">
  {#each grants as grant (grant.id)}
    {@const checkboxId = `${baseId}-${grant.id}`}
    <div class="flex items-start gap-2">
      <Checkbox
        checked={grantIds.includes(grant.id)}
        {disabled}
        id={checkboxId}
        onCheckedChange={(value: boolean) => onGrantChange(grant.id, value === true)}
      />
      <div class="flex min-w-0 flex-col gap-1">
        <Label for={checkboxId}>{grant.label}</Label>
        <p class="text-muted-foreground text-xs">{grant.description}</p>
      </div>
    </div>
  {/each}
</div>

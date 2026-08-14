<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const checkboxId = $props.id();
  const inputId = `${checkboxId}-input`;

  let checked = $state(false);
  let inputRef = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (checked && inputRef) {
      inputRef.focus();
    }
  });
</script>

<div>
  <div class="flex items-start gap-2">
    <Checkbox
      aria-controls={inputId}
      aria-describedby="{checkboxId}-description"
      bind:checked
      id={checkboxId}
    />
    <div class="grow">
      <div class="grid gap-2">
        <Label for={checkboxId}>Checkbox with expansion</Label>
        <p class="text-muted-foreground text-xs" id="{checkboxId}-description">
          You can use this checkbox with a label and a description.
        </p>
      </div>
      <div
        aria-labelledby={checkboxId}
        class="grid transition-all ease-in-out data-[state=collapsed]:grid-rows-[0fr] data-[state=expanded]:grid-rows-[1fr] data-[state=collapsed]:opacity-0 data-[state=expanded]:opacity-100"
        data-state={checked ? 'expanded' : 'collapsed'}
        id={inputId}
        role="region"
      >
        <div class="-m-2 pointer-events-none overflow-hidden p-2">
          <div class="pointer-events-auto mt-3">
            <Input
              aria-label="Additional Information"
              disabled={!checked}
              id="checkbox-11-additional-info"
              placeholder="Enter details"
              bind:ref={inputRef}
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

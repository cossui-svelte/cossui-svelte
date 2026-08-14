<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';

  const id = $props.id();

  const items = [
    { checked: true, label: 'Monday', value: '1' },
    { checked: true, label: 'Tuesday', value: '2' },
    { label: 'Wednesday', value: '3' },
    { checked: true, label: 'Thursday', value: '4' },
    { checked: true, label: 'Friday', value: '5' },
    { label: 'Saturday', value: '6' },
    { disabled: true, label: 'Sunday', value: '7' }
  ];
</script>

<fieldset class="space-y-4">
  <legend class="font-medium text-foreground text-sm leading-none">Days of the week</legend>
  <div class="flex gap-1.5">
    {#each items as item (item.value)}
      <label
        class="relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border border-input text-center shadow-xs outline-none transition-[color,box-shadow] has-data-disabled:cursor-not-allowed has-data-[state=checked]:border-primary has-focus-visible:border-ring has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground has-data-disabled:opacity-50 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
      >
        <Checkbox
          checked={item.checked}
          class="absolute sr-only after:absolute after:inset-0"
          disabled={item.disabled}
          id="{id}-{item.value}"
          value={item.value}
        />
        <span aria-hidden="true" class="font-medium text-sm">{item.label[0]}</span>
        <span class="sr-only">{item.label}</span>
      </label>
    {/each}
  </div>
</fieldset>

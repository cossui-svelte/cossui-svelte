<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import ChevronUp from '@lucide/svelte/icons/chevron-up';
  import { Label } from '$lib/components/ui/label';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput
  } from '$lib/components/ui/number-field';
  import { createCurrencyFormat } from '$lib/hooks/use-currency-input';

  const uid = $props.id();
  const { format, parse } = createCurrencyFormat();
</script>

<div class="*:not-first:mt-2">
  <Label for={uid} class="text-foreground text-sm font-medium">Number field with chevrons</Label>
  <NumberField id={uid} value={99} min={0} step={0.1}>
    <NumberFieldGroup class="h-9 items-center overflow-hidden">
      <NumberFieldInput
        {format}
        {parse}
        aria-label="Currency amount"
        aria-roledescription="Currency input"
        autocomplete="off"
        autocorrect="off"
        spellcheck={false}
        class="text-left"
      />
      <div class="flex h-[calc(100%+2px)] flex-col">
        <NumberFieldIncrement
          aria-controls={uid}
          aria-label="Increase value"
          class="rounded-none border-input bg-background px-0 text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          tabindex={-1}
        >
          <ChevronUp size={12} aria-hidden="true" />
        </NumberFieldIncrement>
        <NumberFieldDecrement
          aria-controls={uid}
          aria-label="Decrease value"
          class="rounded-none border-input bg-background px-0 text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          tabindex={-1}
        >
          <ChevronDown size={12} aria-hidden="true" />
        </NumberFieldDecrement>
      </div>
    </NumberFieldGroup>
  </NumberField>
</div>

<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldValue
  } from '$lib/components/ui/number-field';
</script>

<NumberField class="w-auto" value={235}>
  <NumberFieldGroup>
    <NumberFieldIncrement
      aria-label="Upvote"
      class="size-9 rounded-none px-0 first:rounded-s-[calc(var(--radius-lg)-1px)] last:rounded-e-[calc(var(--radius-lg)-1px)] sm:size-8"
    >
      <ChevronUpIcon aria-hidden="true" size={16} />
    </NumberFieldIncrement>
    <NumberFieldValue class="px-3" />
    <NumberFieldDecrement
      aria-label="Downvote"
      class="size-9 rounded-none px-0 first:rounded-s-[calc(var(--radius-lg)-1px)] last:rounded-e-[calc(var(--radius-lg)-1px)] sm:size-8"
    >
      <ChevronDownIcon aria-hidden="true" size={16} />
    </NumberFieldDecrement>
  </NumberFieldGroup>
</NumberField>

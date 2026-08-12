<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldValue
  } from '$lib/components/ui/number-field';
</script>

<NumberField class="w-auto" value={235}>
  <div class="-space-x-px inline-flex rounded-md shadow-xs rtl:space-x-reverse">
    <NumberFieldIncrement
      aria-label="Upvote"
      class="size-9 rounded-none border border-input px-0 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 sm:size-8"
    >
      <ChevronUpIcon aria-hidden="true" size={16} />
    </NumberFieldIncrement>
    <NumberFieldValue class="border border-input px-3" />
    <NumberFieldDecrement
      aria-label="Downvote"
      class="size-9 rounded-none border border-input px-0 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 sm:size-8"
    >
      <ChevronDownIcon aria-hidden="true" size={16} />
    </NumberFieldDecrement>
  </div>
</NumberField>

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
  <div class="-space-x-px inline-flex rounded-full shadow-xs rtl:space-x-reverse">
    <NumberFieldIncrement
      aria-label="Upvote"
      class="size-9 rounded-none border-none bg-primary px-0 text-primary-foreground shadow-none first:rounded-s-full last:rounded-e-full hover:bg-primary/90 focus-visible:z-10 sm:size-8"
    >
      <ChevronUpIcon aria-hidden="true" size={16} />
    </NumberFieldIncrement>
    <NumberFieldValue class="bg-primary px-1 text-primary-foreground" />
    <NumberFieldDecrement
      aria-label="Downvote"
      class="size-9 rounded-none border-none bg-primary px-0 text-primary-foreground shadow-none first:rounded-s-full last:rounded-e-full hover:bg-primary/90 focus-visible:z-10 sm:size-8"
    >
      <ChevronDownIcon aria-hidden="true" size={16} />
    </NumberFieldDecrement>
  </div>
</NumberField>

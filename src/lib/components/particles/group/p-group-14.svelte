<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import {
    NumberField,
    NumberFieldGroup,
    NumberFieldInput,
  } from "$lib/components/ui/number-field";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";

  const currencies = [
    { label: "US Dollar", value: "$" },
    { label: "Euro", value: "€" },
    { label: "British Pound", value: "£" },
  ];

  let currency = $state("$");
  let amount = $state(10);
</script>

<Group aria-label="Payment amount">
  <Group aria-label="Amount input">
    <Select bind:value={currency}>
      <SelectTrigger class="w-fit min-w-none">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup class="min-w-48">
        {#each currencies as curr (curr.value)}
          <SelectItem value={curr.value}>
            {curr.value} <span class="ms-1">{curr.label}</span>
          </SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <GroupSeparator />
    <NumberField aria-label="Enter the amount" class="gap-0" bind:value={amount}>
      <NumberFieldGroup>
        <NumberFieldInput class="text-left" />
      </NumberFieldGroup>
    </NumberField>
  </Group>
  <Group aria-label="Submit">
    <Button aria-label="Send" size="icon" variant="outline">
      <ArrowRight aria-hidden />
    </Button>
  </Group>
</Group>

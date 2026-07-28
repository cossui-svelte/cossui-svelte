<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from "$lib/components/ui/input-group";
  import { formatNumeral, NumeralThousandGroupStyles } from "cleave-zen";
  import type { Attachment } from "svelte/attachments";

  const currencyAttachment: Attachment<HTMLInputElement> = (input) => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatNumeral(target.value, {
        numeralThousandsGroupStyle: NumeralThousandGroupStyles.THOUSAND,
        numeralDecimalScale: 2,
      });
    };

    input.addEventListener("input", handleInput);

    return () => input.removeEventListener("input", handleInput);
  };
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Enter the amount"
    inputmode="decimal"
    value="10.00"
    {@attach currencyAttachment}
  />
  <InputGroupAddon>
    <InputGroupText>€</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>EUR</InputGroupText>
  </InputGroupAddon>
</InputGroup>

<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger,
  } from "$lib/components/ui/accordion";
  import { Button } from "$lib/components/ui/button";

  let value = $state<string[]>([]);
</script>

<div class="flex w-full flex-col gap-4">
  <Accordion class="w-full" type="multiple" bind:value>
    <AccordionItem value="item-1">
      <AccordionTrigger>What is Base UI?</AccordionTrigger>
      <AccordionPanel>
        Base UI is a library of high-quality unstyled React components for
        design systems and web apps.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How do I get started?</AccordionTrigger>
      <AccordionPanel>
        Head to the "Quick start" guide in the docs. If you've used unstyled
        libraries before, you'll feel at home.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Can I use it for my project?</AccordionTrigger>
      <AccordionPanel>
        Of course! Base UI is free and open source.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>

  <div class="flex flex-col items-start gap-4">
    <Button onclick={() => (value = ["item-1", "item-2"])} variant="outline">
      Open First Two
    </Button>
    <p class="text-muted-foreground text-sm">
      Open items: {value.length > 0 ? value.join(", ") : "None"}
    </p>
  </div>
</div>

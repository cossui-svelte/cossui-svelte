<script lang="ts">
  import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
  } from "$lib/components/ui/stepper";

  const steps = [
    {
      description: "Desc for step one",
      step: 1,
      title: "Step One",
    },
    {
      description: "Desc for step two",
      step: 2,
      title: "Step Two",
    },
    {
      description: "Desc for step three",
      step: 3,
      title: "Step Three",
    },
  ];
</script>

<div class="space-y-8 text-center">
  <Stepper step={2}>
    {#each steps as { step, title, description } (step)}
      <StepperItem class="not-last:flex-1 max-md:items-start" {step}>
        <StepperTrigger class="gap-4 rounded max-md:flex-col">
          <StepperIndicator />
          <div class="text-center md:-order-1 md:text-left">
            <StepperTitle>{title}</StepperTitle>
            <StepperDescription class="max-sm:hidden">{description}</StepperDescription>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator class="mx-0 max-md:mt-3.5 md:mx-4" />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Stepper with inline titles and descriptions
  </p>
</div>

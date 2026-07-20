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

<div class="space-y-8 w-full">
  <Stepper step={2}>
    {#each steps as { step, title, description } (step)}
      <StepperItem class="not-last:flex-1" {step}>
        <StepperTrigger class="gap-3 rounded">
          <StepperIndicator />
          <div class="-order-1 space-y-0.5 text-left">
            <StepperTitle>{title}</StepperTitle>
            <StepperDescription class="max-sm:hidden">{description}</StepperDescription>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator class="mx-4" />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
</div>

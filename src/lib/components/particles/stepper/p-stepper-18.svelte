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
  <Stepper orientation="vertical" step={2}>
    {#each steps as { step, title, description } (step)}
      <StepperItem class="relative not-last:flex-1 items-start" {step}>
        <StepperTrigger class="flex-row items-start gap-x-3 rounded pb-8 last:pb-0">
          <StepperIndicator />
          <div class="space-y-0.5 text-left">
            <StepperTitle>{title}</StepperTitle>
            <StepperDescription>{description}</StepperDescription>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator class="absolute top-6 -bottom-1.5 left-5 -order-1 m-0 -translate-x-1/2" />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Vertical stepper with inline titles and descriptions
  </p>
</div>

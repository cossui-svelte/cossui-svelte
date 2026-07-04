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
      <StepperItem className="relative flex-1 flex-col!" {step}>
        <StepperTrigger className="flex-col gap-3 rounded">
          <StepperIndicator />
          <div class="space-y-0.5 px-2">
            <StepperTitle>{title}</StepperTitle>
            <StepperDescription className="max-sm:hidden">{description}</StepperDescription>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator
            className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none"
          />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Stepper with titles and descriptions
  </p>
</div>

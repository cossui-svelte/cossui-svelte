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
  <Stepper class="items-start" step={2}>
    {#each steps as { step, title, description } (step)}
      <StepperItem class="relative flex-1 flex-col!" {step}>
        <StepperTrigger class="flex-col gap-3 rounded">
          <StepperIndicator />
          <div class="space-y-0.5 px-2">
            <StepperTitle>{title}</StepperTitle>
            <StepperDescription class="max-sm:hidden">{description}</StepperDescription>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator
            class="absolute inset-x-0 top-4.5 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.25rem)] group-data-[orientation=horizontal]/stepper:flex-none"
          />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Stepper with titles and descriptions
  </p>
</div>

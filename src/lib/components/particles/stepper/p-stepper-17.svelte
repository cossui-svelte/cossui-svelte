<script lang="ts">
  import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
  } from "$lib/components/ui/stepper";

  const steps = [
    {
      step: 1,
      title: "Step One",
    },
    {
      step: 2,
      title: "Step Two",
    },
    {
      step: 3,
      title: "Step Three",
    },
    {
      step: 4,
      title: "Step Four",
    },
  ];
</script>

<div class="space-y-8 text-center">
  <Stepper orientation="vertical" step={2}>
    {#each steps as { step, title } (step)}
      <StepperItem class="relative not-last:flex-1 items-start" {step}>
        <StepperTrigger class="flex-row items-start gap-x-3 rounded pb-8 last:pb-0">
          <StepperIndicator />
          <div class="text-left">
            <StepperTitle>{title}</StepperTitle>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator class="absolute top-6 -bottom-3.5 left-5 -order-1 m-0 -translate-x-1/2" />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Vertical stepper with inline titles
  </p>
</div>

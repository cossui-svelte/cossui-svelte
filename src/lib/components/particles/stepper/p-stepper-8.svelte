<script lang="ts">
  import {
    Stepper,
    StepperIndicator,
    StepperItem,
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

<div class="mx-auto max-w-xl space-y-8 text-center">
  <Stepper class="gap-4" step={2}>
    {#each steps as { step, title } (step)}
      <StepperItem class="flex-1" {step}>
        <StepperTrigger class="w-full flex-col items-start gap-2 rounded">
          <StepperIndicator class="h-1 w-full bg-border">
            <span class="sr-only">{step}</span>
          </StepperIndicator>
          <div class="space-y-0.5">
            <StepperTitle>{title}</StepperTitle>
          </div>
        </StepperTrigger>
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Stepper with labels
  </p>
</div>

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


  <Stepper orientation="vertical" step={2}>
    {#each steps as { step, title } (step)}
      <StepperItem class="relative not-last:flex-1 items-start self-stretch" {step}>
        <StepperTrigger class="flex-row items-start gap-x-3 rounded pb-8 last:pb-0">
          <StepperIndicator />
          <div class="text-left">
            <StepperTitle>{title}</StepperTitle>
          </div>
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator class="absolute top-6 -bottom-1.5 left-5 -order-1 m-0 -translate-x-1/2" />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>



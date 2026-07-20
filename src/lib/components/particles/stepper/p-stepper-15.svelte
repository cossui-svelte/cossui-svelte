<script lang="ts">
  import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTrigger,
  } from "$lib/components/ui/stepper";

  const steps = [1, 2, 3, 4];
</script>

<div class="space-y-8 text-center">
  <Stepper orientation="vertical" step={2}>
    {#each steps as step (step)}
      <StepperItem class="not-last:flex-1" {step}>
        <StepperTrigger>
          <StepperIndicator />
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
</div>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTrigger,
  } from "$lib/components/ui/stepper";

  const steps = [1, 2, 3, 4];

  let currentStep = $state(2);
</script>

<div class="mx-auto max-w-xl space-y-8 text-center">
  <Stepper bind:step={currentStep}>
    {#each steps as step (step)}
      <StepperItem className="not-last:flex-1" {step}>
        <StepperTrigger>
          <StepperIndicator />
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <div class="flex justify-center space-x-4">
    <Button
      class="w-32"
      disabled={currentStep === 1}
      onclick={() => (currentStep = currentStep - 1)}
      variant="outline"
    >
      Prev step
    </Button>
    <Button
      class="w-32"
      disabled={currentStep > steps.length}
      onclick={() => (currentStep = currentStep + 1)}
      variant="outline"
    >
      Next step
    </Button>
  </div>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Controlled stepper with checkmarks
  </p>
</div>

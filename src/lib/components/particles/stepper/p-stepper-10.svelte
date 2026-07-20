<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from "$lib/components/ui/stepper";

  const steps = [1, 2, 3, 4];

  let currentStep = $state(1);
</script>

<div class="mx-auto max-w-xl space-y-8 text-center w-full">
  <div class="space-y-3">
    <Stepper bind:step={currentStep} class="gap-0">
      {#each steps as step (step)}
        <StepperItem class="flex-1" {step}>
          <StepperTrigger class="w-full flex-col items-start gap-2 px-0">
            <StepperIndicator
              class="h-2 w-full rounded-none border-0 bg-border data-[state=active]:bg-primary data-[state=completed]:bg-primary"
            >
              <span class="sr-only">{step}</span>
            </StepperIndicator>
          </StepperTrigger>
        </StepperItem>
      {/each}
    </Stepper>
    <div class="font-medium text-muted-foreground text-sm tabular-nums">
      Step {currentStep} of {steps.length}
    </div>
  </div>
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
      disabled={currentStep >= steps.length}
      onclick={() => (currentStep = currentStep + 1)}
      variant="outline"
    >
      Next step
    </Button>
  </div>
</div>

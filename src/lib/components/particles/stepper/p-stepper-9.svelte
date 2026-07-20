<script lang="ts">
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import { Button } from "$lib/components/ui/button";
  import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from "$lib/components/ui/stepper";

  const steps = [1, 2, 3, 4];

  let currentStep = $state(2);
</script>

<div class="mx-auto max-w-xl space-y-8 text-center w-full">
  <div class="flex items-center gap-2">
    <Button
      aria-label="Prev step"
      class="shrink-0"
      disabled={currentStep === 1}
      onclick={() => (currentStep = currentStep - 1)}
      size="icon"
      variant="ghost"
    >
      <ChevronLeftIcon aria-hidden="true" size={16} />
    </Button>
    <Stepper class="gap-1" bind:step={currentStep}>
      {#each steps as step (step)}
        <StepperItem class="flex-1" {step}>
          <StepperTrigger class="w-full flex-col items-start gap-1">
            <StepperIndicator
              class="h-1 w-full bg-border data-[state=active]:bg-primary data-[state=completed]:bg-primary"
            >
              <span class="sr-only">{step}</span>
            </StepperIndicator>
          </StepperTrigger>
        </StepperItem>
      {/each}
    </Stepper>
    <Button
      aria-label="Next step"
      class="shrink-0"
      disabled={currentStep === steps.length}
      onclick={() => (currentStep = currentStep + 1)}
      size="icon"
      variant="ghost"
    >
      <ChevronRightIcon aria-hidden="true" size={16} />
    </Button>
  </div>
</div>

<script lang="ts">
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import { Button } from "$lib/components/ui/button";
  import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from "$lib/components/ui/stepper";

  const steps = [1, 2, 3, 4];

  let currentStep = $state(2);
</script>

<div class="mx-auto max-w-xl space-y-8 text-center">
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
    <Stepper className="gap-1" bind:step={currentStep}>
      {#each steps as step (step)}
        <StepperItem className="flex-1" {step}>
          <StepperTrigger className="w-full flex-col items-start gap-2">
            <StepperIndicator className="h-1 w-full bg-border">
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
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Paginated stepper
  </p>
</div>

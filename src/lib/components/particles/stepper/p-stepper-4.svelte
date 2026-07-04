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

<div class="mx-auto max-w-xl space-y-8 text-center">
  <Stepper step={2}>
    {#each steps as step (step)}
      <StepperItem className="not-last:flex-1" {step}>
        <StepperTrigger>
          <StepperIndicator
            className="size-4 data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-transparent [&_span]:sr-only [&_svg]:size-3"
          />
        </StepperTrigger>
        {#if step < steps.length}
          <StepperSeparator />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Stepper with tiny buttons and checkmarks
  </p>
</div>

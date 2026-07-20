<script lang="ts">
  import { Button } from "$lib/components/ui/button";
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
    { description: "Create your account", title: "Account" },
    { description: "Add your address", title: "Address" },
    { description: "Review and submit", title: "Review" },
  ];

  let step = $state(1);
</script>

<div class="space-y-8 w-full">
  <Stepper bind:step>
    {#each steps as { title, description }, i (title)}
      <StepperItem step={i + 1} class="flex-1">
        <StepperTrigger>
          <StepperIndicator />
          <div class="flex flex-col items-start">
            <StepperTitle>{title}</StepperTitle>
            <StepperDescription>{description}</StepperDescription>
          </div>
        </StepperTrigger>
        {#if i < steps.length - 1}
          <StepperSeparator />
        {/if}
      </StepperItem>
    {/each}
  </Stepper>

  <div class="flex justify-between">
    <Button
      variant="outline"
      disabled={step === 1}
      onclick={() => (step = Math.max(1, step - 1))}
    >
      Previous
    </Button>
    <Button
      disabled={step === steps.length}
      onclick={() => (step = Math.min(steps.length, step + 1))}
    >
      Next
    </Button>
  </div>
</div>

<script lang="ts">
  import Shuffle from "@lucide/svelte/icons/shuffle";
  import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTrigger,
  } from "$lib/components/ui/stepper";
  import avatar from "$assets/avatar-40-05.jpg";
</script>

<div class="mx-auto max-w-xl space-y-8 text-center">
  <Stepper step={2}>
    <StepperItem class="not-last:flex-1" step={1}>
      <StepperTrigger>
        <StepperIndicator>
          <enhanced:img alt="Mike Palmer" class="rounded-full" src={avatar} />
        </StepperIndicator>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>
    <StepperItem class="not-last:flex-1" loading step={2}>
      <StepperTrigger>
        <StepperIndicator />
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>
    <StepperItem class="not-last:flex-1" step={3}>
      <StepperTrigger>
        <StepperIndicator>
          <Shuffle aria-hidden="true" size={14} />
          <span class="sr-only">Shuffle</span>
        </StepperIndicator>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Stepper with mixed elements
  </p>
</div>

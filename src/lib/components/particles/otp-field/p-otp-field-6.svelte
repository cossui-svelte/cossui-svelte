<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { OTPField, OTPFieldInput } from "$lib/components/ui/otp-field";

  const OTP_LENGTH = 6;

  let value = $state("");
  let focusedIndex = $state(0);
  let invalidPulse = $state(0);
  let statusMessage = $state("");
  let invalidTimer: ReturnType<typeof setTimeout> | undefined;

  function clearInvalidFeedback() {
    clearTimeout(invalidTimer);
    invalidTimer = undefined;
    invalidPulse = 0;
    statusMessage = "";
  }

  function handleValueChange() {
    clearInvalidFeedback();
  }
</script>

<div class="flex flex-col items-center gap-2">
  <Label>Tier code</Label>
  <OTPField maxlength={OTP_LENGTH} inputmode="numeric" bind:value onValueChange={handleValueChange}>
    {#snippet children({ cells })}
      {#each cells as cell, i}
        <OTPFieldInput
          aria-invalid={(invalidPulse > 0 && focusedIndex === i) || undefined}
          aria-label={`Character ${i + 1} of ${OTP_LENGTH}`}
          {cell}
          onfocus={() => { focusedIndex = i; }}
        />
      {/each}
    {/snippet}
  </OTPField>
  <p class="text-muted-foreground text-xs">Digits 0-3 only.</p>
  <span aria-live="polite" class="sr-only">{statusMessage}</span>
</div>

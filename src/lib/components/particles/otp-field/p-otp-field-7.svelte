<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { OTPField, OTPFieldInput } from "$lib/components/ui/otp-field";

  const OTP_LENGTH = 6;

  let value = $state("");
  let invalid = $state(false);
  const valid = $derived(value.length === OTP_LENGTH && value === "123456");
</script>

<div class="flex flex-col items-center gap-2">
  <Label>Verification code</Label>
  <OTPField
    maxlength={OTP_LENGTH}
    bind:value
    onValueChange={(v) => {
      invalid = v.length === OTP_LENGTH ? v !== "123456" : false;
    }}
  >
    {#snippet children({ cells })}
      {#each cells as cell, i}
        <OTPFieldInput
          aria-invalid={invalid || undefined}
          aria-label={`Character ${i + 1} of ${OTP_LENGTH}`}
          {cell}
        />
      {/each}
    {/snippet}
  </OTPField>
  {#if !valid && !invalid}
    <p class="text-muted-foreground text-xs">Enter `123456` to pass validation.</p>
  {/if}
  {#if invalid}
    <p class="text-destructive text-xs">Code must be 123456.</p>
  {/if}
  {#if valid}
    <p class="text-muted-foreground text-xs">Code verified.</p>
  {/if}
</div>

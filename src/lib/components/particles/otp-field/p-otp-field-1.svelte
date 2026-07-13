<script lang="ts">
  import { OTPField, OTPFieldInput } from "$lib/components/ui/otp-field";

  const OTP_LENGTH = 6;
</script>

<OTPField aria-label="One-time password" maxlength={OTP_LENGTH}>
  {#snippet children({ cells })}
    {#each cells as cell, i (i)}
      <OTPFieldInput aria-label={`Character ${i + 1} of ${OTP_LENGTH}`} {cell} />
    {/each}
  {/snippet}
</OTPField>

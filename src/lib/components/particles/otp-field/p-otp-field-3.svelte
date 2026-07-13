<script lang="ts">
  import { OTPField, OTPFieldInput, OTPFieldSeparator } from "$lib/components/ui/otp-field";

  const OTP_LENGTH = 6;
  const GROUP_LENGTH = 3;
</script>

<OTPField aria-label="Verification code" maxlength={OTP_LENGTH}>
  {#snippet children({ cells })}
    {#each cells.slice(0, GROUP_LENGTH) as cell, i (i)}
      <OTPFieldInput aria-label={`Character ${i + 1} of ${OTP_LENGTH}`} {cell} />
    {/each}
    <OTPFieldSeparator />
    {#each cells.slice(GROUP_LENGTH) as cell, i (i)}
      <OTPFieldInput aria-label={`Character ${i + GROUP_LENGTH + 1} of ${OTP_LENGTH}`} {cell} />
    {/each}
  {/snippet}
</OTPField>

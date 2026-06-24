<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { OTPField, OTPFieldInput } from "$lib/components/ui/otp-field";

  const OTP_LENGTH = 6;
</script>

<div class="flex flex-col items-center gap-2">
  <Label>Recovery code</Label>
  <OTPField maxlength={OTP_LENGTH}>
    {#snippet children({ cells })}
      {#each cells as cell, i}
        <OTPFieldInput aria-label={`Character ${i + 1} of ${OTP_LENGTH}`} {cell} />
      {/each}
    {/snippet}
  </OTPField>
  <p class="text-muted-foreground text-xs">
    Accept letters and numbers for backup codes such as
    <code class="font-mono text-foreground">A7C9XZ</code>.
  </p>
</div>

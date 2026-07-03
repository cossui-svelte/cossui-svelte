<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { OTPField, OTPFieldInput } from "$lib/components/ui/otp-field";

  const OTP_LENGTH = 6;
</script>

<div class="flex flex-col items-center gap-2">
  <Label>Access code</Label>
  <OTPField maxlength={OTP_LENGTH}>
    {#snippet children({ cells })}
      {#each cells as cell, i}
        <OTPFieldInput aria-label={`Character ${i + 1} of ${OTP_LENGTH}`} {cell} mask />
      {/each}
    {/snippet}
  </OTPField>
  <p class="text-muted-foreground text-xs">
    Use <code class="font-mono text-foreground">mask</code> to obscure the code on shared screens.
  </p>
</div>

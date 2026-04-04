<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import {
        InputOTP,
        InputOTPGroup,
        InputOTPSeparator,
        InputOTPSlot,
    } from "$lib/components/ui/input-otp";
    import { Label } from "$lib/components/ui/label";

    let value = $state("");
    let invalid = $state(false);
    const id = "otp-input";

    const valid = $derived(value.length === 6 && value === "123456");
</script>

<ComponentPreviewTabs>
    <div class="flex flex-col items-center gap-2">
        <Label for={id}>Verification code</Label>
        <InputOTP
            aria-label="Verification code"
            {id}
            maxlength={6}
            bind:value
            onValueChange={(nextValue) => {
                invalid =
                    nextValue.length === 6 ? nextValue !== "123456" : false;
            }}
        >
            {#snippet children({ cells })}
                <InputOTPGroup>
                    <InputOTPSlot
                        aria-invalid={invalid || undefined}
                        cell={cells[0]}
                    />
                    <InputOTPSlot
                        aria-invalid={invalid || undefined}
                        cell={cells[1]}
                    />
                    <InputOTPSlot
                        aria-invalid={invalid || undefined}
                        cell={cells[2]}
                    />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot
                        aria-invalid={invalid || undefined}
                        cell={cells[3]}
                    />
                    <InputOTPSlot
                        aria-invalid={invalid || undefined}
                        cell={cells[4]}
                    />
                    <InputOTPSlot
                        aria-invalid={invalid || undefined}
                        cell={cells[5]}
                    />
                </InputOTPGroup>
            {/snippet}
        </InputOTP>
        {#if !valid && !invalid}
            <p class="text-muted-foreground text-xs">
                Enter `123456` to pass validation.
            </p>
        {/if}
        {#if invalid}
            <p class="text-destructive-foreground text-xs">
                Code must be 123456.
            </p>
        {/if}
        {#if valid}
            <p class="text-success-foreground text-xs">Code verified.</p>
        {/if}
    </div>
</ComponentPreviewTabs>

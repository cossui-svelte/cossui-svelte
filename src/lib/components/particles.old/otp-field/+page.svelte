<script lang="ts">
    import { Label } from "$lib/components/ui/label";
    import {
        OTPField,
        OTPFieldInput,
        OTPFieldSeparator,
    } from "$lib/components/ui/otp-field";
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";

    let value = $state("");
    let invalid = $state(false);
    const id = "otp-input";

    const valid = $derived(value.length === 6 && value === "123456");
</script>

<ComponentPreviewTabs>
    <div class="flex flex-col items-center gap-2">
        <Label for={id}>Verification code</Label>
        <OTPField
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
                <OTPFieldInput
                    aria-invalid={invalid || undefined}
                    cell={cells[0]}
                />
                <OTPFieldInput
                    aria-invalid={invalid || undefined}
                    cell={cells[1]}
                />
                <OTPFieldInput
                    aria-invalid={invalid || undefined}
                    cell={cells[2]}
                />
                <OTPFieldSeparator />
                <OTPFieldInput
                    aria-invalid={invalid || undefined}
                    cell={cells[3]}
                />
                <OTPFieldInput
                    aria-invalid={invalid || undefined}
                    cell={cells[4]}
                />
                <OTPFieldInput
                    aria-invalid={invalid || undefined}
                    cell={cells[5]}
                />
            {/snippet}
        </OTPField>
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

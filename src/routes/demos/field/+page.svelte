<script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Field,
        FieldDescription,
        FieldError,
        FieldLabel,
        FieldValidity,
    } from "$lib/components/ui/field";
    import { Input } from "$lib/components/ui/input";
    import {
        InputGroup,
        InputGroupAddon,
        InputGroupInput,
    } from "$lib/components/ui/input-group";
    import { ArrowRightIcon } from "lucide-svelte";
</script>

<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter your name" type="text" />
        <FieldDescription>Visible on your profile</FieldDescription>
    </Field>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="Enter your email" type="email" />
        <FieldError>Please enter a valid email address.</FieldError>
    </Field>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="Enter your email" required type="email" />
        <FieldValidity>
            {#snippet children(validity)}
                <div class="flex w-full flex-col gap-2">
                    {#if validity.error}
                        <p class="text-destructive-foreground text-xs">
                            {validity.error}
                        </p>
                    {/if}

                    <div class="w-full rounded-md bg-muted p-2">
                        <pre
                            class="max-h-60 overflow-y-auto font-mono text-xs [scrollbar-width:none]">
                {JSON.stringify(validity, null, 2)}
              </pre>
                    </div>
                </div>
            {/snippet}
        </FieldValidity>
    </Field>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Subscribe</FieldLabel>
        <InputGroup>
            <InputGroupInput placeholder="Your best email" type="email" />
            <InputGroupAddon align="inline-end">
                <Button aria-label="Subscribe" size="icon-xs" variant="ghost">
                    <ArrowRightIcon aria-hidden="true" />
                </Button>
            </InputGroupAddon>
        </InputGroup>
        <FieldError>Please enter a valid email address.</FieldError>
    </Field>
</ComponentPreviewTabs>

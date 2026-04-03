<script lang="ts">
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

    function toAnchorLink(text: string): string {
        return (
            "#" +
            text
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
        );
    }
</script>

{#snippet header(title: string)}
    <h3
        id="required-field"
        class="mt-8 scroll-m-20 font-semibold text-lg *:[code]:text-lg"
    >
        <a
            class="no-underline underline-offset-4 hover:underline"
            href={toAnchorLink(title)}>{title}</a
        >
    </h3>
{/snippet}

{@render header("Default")}
<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter your name" type="text" />
        <FieldDescription>Visible on your profile</FieldDescription>
    </Field>
</ComponentPreviewTabs>

{@render header("Required Field")}
<ComponentPreviewTabs>
    <Field>
        <FieldLabel>
            Password <span class="text-destructive-foreground">*</span>
        </FieldLabel>
        <Input placeholder="Enter password" required type="password" />
        <FieldError>Please fill out this field.</FieldError>
    </Field>
</ComponentPreviewTabs>

{@render header("Disabled Field")}
<ComponentPreviewTabs>
    <Field disabled>
        <FieldLabel>Email</FieldLabel>
        <Input disabled placeholder="Enter your email" type="email" />
        <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
</ComponentPreviewTabs>

{@render header("With Error")}
<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="Enter your email" type="email" />
        <FieldError>Please enter a valid email address.</FieldError>
    </Field>
</ComponentPreviewTabs>

{@render header("With Validity")}
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

{@render header("Input Group")}
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

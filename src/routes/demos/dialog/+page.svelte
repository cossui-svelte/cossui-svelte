<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import {
        Dialog,
        DialogClose,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogPanel,
        DialogPopup,
        DialogTitle,
        DialogTrigger,
    } from "$lib/components/ui/dialog";

    import { Field, FieldLabel } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { valibotClient } from "sveltekit-superforms/adapters";
    import { superForm } from "sveltekit-superforms/client";
    import { schema } from "./schema.js";

    let { data } = $props();

    const formConfig = superForm(data.form, {
        SPA: true,
        validators: valibotClient(schema),
    });
</script>

<ComponentPreviewTabs>
    <Dialog>
        <DialogTrigger class={buttonVariants({ variant: "outline" })}>
            Open Dialog
        </DialogTrigger>
        <DialogPopup class="sm:max-w-sm">
            <Form config={formConfig} class="contents">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <DialogPanel class="grid gap-4">
                    <Field name="name">
                        <FieldLabel>Name</FieldLabel>
                        <Input value="Margaret Welsh" type="text" />
                    </Field>
                    <Field name="username">
                        <FieldLabel>Username</FieldLabel>
                        <Input value="@maggie.welsh" type="text" />
                    </Field>
                </DialogPanel>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </Form>
        </DialogPopup>
    </Dialog>
</ComponentPreviewTabs>

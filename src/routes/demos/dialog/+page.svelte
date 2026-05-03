<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
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
</script>

<ComponentPreviewTabs>
    <Dialog>
        <DialogTrigger class={buttonVariants({ variant: "outline" })}>
            <!-- <Button variant="outline">Open Dialog</Button> -->
            Open Dialog
        </DialogTrigger>
        <DialogPopup class="sm:max-w-sm">
            <Form class="contents">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <DialogPanel class="grid gap-4">
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <Input value="Margaret Welsh" type="text" />
                    </Field>
                    <Field>
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

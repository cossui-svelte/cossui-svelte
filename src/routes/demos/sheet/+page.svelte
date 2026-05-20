<script>
import ComponentPreviewTabs from '$lib/components/app/component-preview-tabs.svelte';
import { Button, buttonVariants } from '$lib/components/ui/button';
import { Field, FieldLabel } from '$lib/components/ui/field';
import { Form } from '$lib/components/ui/form';
import { Input } from '$lib/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger
} from '$lib/components/ui/sheet';
</script>

<ComponentPreviewTabs>
    <Sheet>
        <SheetTrigger class={buttonVariants({ variant: "outline" })}>
            Open Sheet
        </SheetTrigger>
        <SheetPopup>
            <Form class="contents">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <SheetPanel class="grid gap-4">
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <Input defaultValue="Margaret Welsh" type="text" />
                    </Field>
                    <Field>
                        <FieldLabel>Username</FieldLabel>
                        <Input defaultValue="@maggie.welsh" type="text" />
                    </Field>
                </SheetPanel>
                <SheetFooter>
                    <SheetClose>
                        <Button variant="ghost">Cancel</Button>
                    </SheetClose>
                    <Button type="submit">Save</Button>
                </SheetFooter>
            </Form>
        </SheetPopup>
    </Sheet>
</ComponentPreviewTabs>

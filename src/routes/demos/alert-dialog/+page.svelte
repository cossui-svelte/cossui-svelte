<script>
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import {
        AlertDialog,
        AlertDialogClose,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogPopup,
        AlertDialogTitle,
        AlertDialogTrigger,
    } from "$lib/components/ui/alert-dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
</script>

<ComponentPreviewTabs>
    <AlertDialog>
        <AlertDialogTrigger
            class={buttonVariants({ variant: "destructive-outline" })}
        >
            Delete Account
        </AlertDialogTrigger>
        <AlertDialogPopup>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogClose>
                    <Button variant="ghost">Cancel</Button>
                </AlertDialogClose>
                <AlertDialogClose>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogClose>
            </AlertDialogFooter>
        </AlertDialogPopup>
    </AlertDialog>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <AlertDialog>
        <AlertDialogTrigger
            class={buttonVariants({ variant: "destructive-outline" })}
        >
            Delete Account
        </AlertDialogTrigger>
        <AlertDialogPopup>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogClose>
                    <Button variant="ghost">Cancel</Button>
                </AlertDialogClose>
                <AlertDialogClose>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogClose>
            </AlertDialogFooter>
        </AlertDialogPopup>
    </AlertDialog>
</ComponentPreviewTabs>

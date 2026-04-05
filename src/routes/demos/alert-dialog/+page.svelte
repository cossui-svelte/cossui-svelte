<script>
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
    import { Button } from "$lib/components/ui/button";
</script>

<AlertDialog>
    <AlertDialogTrigger>
        <Button variant="destructive-outline">Delete Account</Button>
    </AlertDialogTrigger>
    <AlertDialogPopup>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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

<script lang="ts">
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogClose,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger,
	} from "$lib/components/ui/alert-dialog";
	import { buttonVariants } from "$lib/components/ui/button";
</script>

<AlertDialog>
	<AlertDialogTrigger class={buttonVariants({ variant: "outline" })}>
		Alert dialog
	</AlertDialogTrigger>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>Are you sure?</AlertDialogTitle>
			<AlertDialogDescription>
				Take a moment to review the details provided to ensure you
				understand the implications.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Okay</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialogRoot>

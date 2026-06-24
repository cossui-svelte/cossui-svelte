<script lang="ts">
	import CircleAlert from "@lucide/svelte/icons/circle-alert";
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
		Alert dialog with icon
	</AlertDialogTrigger>
	<AlertDialogContent>
		<div
			class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4"
		>
			<div
				class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
				aria-hidden="true"
			>
				<CircleAlert class="opacity-80" size={16} strokeWidth={2} />
			</div>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				<AlertDialogDescription>
					Are you sure you want to delete your account? All your data
					will be removed.
				</AlertDialogDescription>
			</AlertDialogHeader>
		</div>
		<AlertDialogFooter>
			<AlertDialogClose>Cancel</AlertDialogClose>
			<AlertDialogAction>Confirm</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>

<script lang="ts">
import { Button, buttonVariants } from '$lib/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '$lib/components/ui/dialog';
import { Textarea } from '$lib/components/ui/textarea';
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: "outline" })}
		>Feedback</DialogTrigger
	>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Send us feedback</DialogTitle>
			<DialogDescription>
				Watch
				<a class="text-foreground hover:underline" href="#title"
					>tutorials</a
				>, read Origin UI&lsquo;s
				<a class="text-foreground hover:underline" href="#title"
					>documentation</a
				>, or join our
				<a class="text-foreground hover:underline" href="#title"
					>Discord</a
				>
				for community help.
			</DialogDescription>
		</DialogHeader>
		<form class="space-y-5">
			<Textarea
				id="feedback"
				placeholder="How can we improve Origin UI?"
				aria-label="Send feedback"
			/>
			<div class="flex flex-col sm:flex-row sm:justify-end">
				<Button type="button">Send feedback</Button>
			</div>
		</form>
	</DialogContent>
</Dialog>

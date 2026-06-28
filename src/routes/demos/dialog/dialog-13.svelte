<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: "outline" })}
		>Sign up</DialogTrigger
	>
	<DialogContent>
		<div class="flex flex-col items-center gap-2">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
				aria-hidden="true"
			>
				<svg
					class="stroke-zinc-800 dark:stroke-zinc-100"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 32 32"
					aria-hidden="true"
				>
					<circle
						cx="16"
						cy="16"
						r="12"
						fill="none"
						stroke-width="8"
					/>
				</svg>
			</div>
			<DialogHeader>
				<DialogTitle class="sm:text-center"
					>Sign up Origin UI</DialogTitle
				>
				<DialogDescription class="sm:text-center">
					We just need a few details to get you started.
				</DialogDescription>
			</DialogHeader>
		</div>

		<form class="space-y-5">
			<div class="space-y-4">
				<div class="space-y-2">
					<Label for="signup-name">Full name</Label>
					<Input
						id="signup-name"
						placeholder="Matt Welsh"
						type="text"
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="signup-email">Email</Label>
					<Input
						id="signup-email"
						placeholder="hi@yourcompany.com"
						type="email"
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="signup-password">Password</Label>
					<Input
						id="signup-password"
						placeholder="Enter your password"
						type="password"
						required
					/>
				</div>
			</div>
			<Button type="button" class="w-full">Sign up</Button>
		</form>

		<div
			class="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
		>
			<span class="text-xs text-muted-foreground">Or</span>
		</div>

		<Button variant="outline">Continue with Google</Button>

		<p class="text-center text-xs text-muted-foreground">
			By signing up you agree to our
			<a class="underline hover:no-underline" href="#title">Terms</a>.
		</p>
	</DialogContent>
</Dialog>

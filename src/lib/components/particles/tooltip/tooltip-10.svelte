<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		LinkPreview,
		LinkPreviewContent,
		LinkPreviewTrigger,
	} from "$lib/components/ui/link-preview";
	import AvatarImg from "$assets/avatar-40-04.jpg?w=40&h=40&enhanced";
</script>

<LinkPreview>
	<LinkPreviewTrigger>
		{#snippet child({ props })}
			<Button
				class="size-auto overflow-hidden rounded-full bg-transparent p-0 hover:bg-transparent"
				aria-label="My profile"
				href="#title"
				{...props}
			>
				<enhanced:img class=" size-10" src={AvatarImg} alt="Avatar" />
			</Button>
		{/snippet}
	</LinkPreviewTrigger>
	<LinkPreviewContent class="w-[340px]">
		<div class="flex items-start gap-3">
			<div class="shrink-0">
				<enhanced:img
					class="size-10 rounded-full"
					src={AvatarImg}
					alt="Avatar"
				/>
			</div>
			<div class="space-y-1">
				<p class="text-sm font-medium">@Origin_UI</p>
				<p class="text-sm text-muted-foreground">
					Beautiful UI components built with Tailwind CSS and Svelte
				</p>
			</div>
		</div>
	</LinkPreviewContent>
</LinkPreview>

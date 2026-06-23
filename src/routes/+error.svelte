<script lang="ts">
	
	import RiArrowLeftLine from "svelte-remix/ArrowLeftLineArrows.svelte";
	import { Button } from "$lib/components/ui/button";
	import PageHeader from "$lib/components/app/page-header.svelte";
	import PageHeaderDescription from "$lib/components/app/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/app/page-header-heading.svelte";
	import { page } from "$app/state";
</script>

<svelte:head>
	<title>Page Not Found {page.status}: {page.error?.message}</title>
	<description>
		The page you're looking for doesn't exist or may have been moved.
	</description>
</svelte:head>

<div class="container w-full">
	<PageHeader>
		<PageHeaderHeading>Page Not Found</PageHeaderHeading>
		<PageHeaderDescription>
			The page you&apos;re looking for doesn&apos;t exist or may have been
			moved.
		</PageHeaderDescription>
		<div class="mt-4">
			<Button class="group" size="lg">
				<a class="flex items-center gap-1" href="/">
					<RiArrowLeftLine
						aria-hidden="true"
						class="opacity-60"
					/>Back to Home
				</a>
			</Button>
		</div>
	</PageHeader>
</div>

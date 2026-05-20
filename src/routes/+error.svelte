<script lang="ts">
	import { page } from "$app/state";
	import PageHeaderDescription from "$lib/components/shared-components/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/shared-components/page-header-heading.svelte";
	import PageHeader from "$lib/components/shared-components/page-header.svelte";
	import { Button } from "$lib/components/ui/button";
	import { RiArrowLeftLine } from "svelte-remixicon";
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
				<a href="/">
					<RiArrowLeftLine
						aria-hidden="true"
						class="-ms-1 group-hover:-translate-x-0.5 opacity-60 transition-transform"
					/>
					Back to Home
				</a>
			</Button>
		</div>
	</PageHeader>
</div>

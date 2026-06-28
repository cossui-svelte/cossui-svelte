<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbEllipsis,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbList,
		BreadcrumbPage,
		BreadcrumbSeparator
	} from '$lib/components/ui/breadcrumb';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';

	const sections = [
		{ href: '#title', label: 'Documentation', value: 'documentation' },
		{ href: '#title', label: 'Themes', value: 'themes' },
		{ href: '#title', label: 'GitHub', value: 'github' }
	];

	let selected = $state<string | undefined>(undefined);

	$effect(() => {
		if (!selected) return;
		const section = sections.find((s) => s.value === selected);
		if (section) window.location.href = section.href;
	});
</script>

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink href="#title">Home</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<Select bind:value={selected} type="single">
				<SelectTrigger class="hover:text-foreground" aria-label="Toggle menu">
					<BreadcrumbEllipsis />
				</SelectTrigger>
				<SelectContent>
					{#each sections as section}
						<SelectItem value={section.value} label={section.label} />
					{/each}
				</SelectContent>
			</Select>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbLink href="#">Components</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>

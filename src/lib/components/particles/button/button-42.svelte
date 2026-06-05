<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import RiFacebookFill from "svelte-remixicon/RiFacebookFill.svelte";
	import RiGithubFill from "svelte-remixicon/RiGithubFill.svelte";
	import RiGoogleFill from "svelte-remixicon/RiGoogleFill.svelte";
	import RiTwitterXFill from "svelte-remixicon/RiTwitterXFill.svelte";
</script>

<div class="inline-flex flex-wrap gap-2">
	<Button variant="outline" aria-label="Login with Google" size="icon">
		<RiGoogleFill width="16" height="16" aria-hidden="true" />
	</Button>
	<Button variant="outline" aria-label="Login with Facebook" size="icon">
		<RiFacebookFill width="16" height="16" aria-hidden="true" />
	</Button>
	<Button variant="outline" aria-label="Login with X" size="icon">
		<RiTwitterXFill width="16" height="16" aria-hidden="true" />
	</Button>
	<Button variant="outline" aria-label="Login with GitHub" size="icon">
		<RiGithubFill width="16" height="16" aria-hidden="true" />
	</Button>
</div>

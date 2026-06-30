<script lang="ts">
	import RiFacebookFill from "svelte-remix/FacebookFillLogos.svelte";
	import RiGithubFill from "svelte-remix/GithubFillLogos.svelte";
	import RiGoogleFill from "svelte-remix/GoogleFillLogos.svelte";
	import RiTwitterXFill from "svelte-remix/TwitterXFillLogos.svelte";
	import { Button } from "$lib/components/ui/button";
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

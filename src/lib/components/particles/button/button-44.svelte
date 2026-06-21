<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import RiFacebookFill from "svelte-remix/FacebookFillLogos.svelte";
	import RiGithubFill from "svelte-remix/GithubFillLogos.svelte";
	import RiGoogleFill from "svelte-remix/GoogleFillLogos.svelte";
	import RiTwitterXFill from "svelte-remix/TwitterXFillLogos.svelte";
</script>

<div class="flex flex-col gap-2">
	<Button variant="outline">
		<RiGoogleFill
			class="me-1 text-[#DB4437] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with Google
	</Button>
	<Button variant="outline">
		<RiTwitterXFill
			class="me-1 text-[#14171a] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with X
	</Button>
	<Button variant="outline">
		<RiFacebookFill
			class="me-1 text-[#1877f2] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with Facebook
	</Button>
	<Button variant="outline">
		<RiGithubFill
			class="me-1 text-[#333333] dark:text-white/60"
			width="16"
			height="16"
			aria-hidden="true"
		/>
		Login with GitHub
	</Button>
</div>

<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import RiFacebookFill from "svelte-remixicon/RiFacebookFill.svelte";
	import RiGithubFill from "svelte-remixicon/RiGithubFill.svelte";
	import RiGoogleFill from "svelte-remixicon/RiGoogleFill.svelte";
	import RiTwitterXFill from "svelte-remixicon/RiTwitterXFill.svelte";
</script>

<div class="flex flex-col gap-2">
	<Button class="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90">
		<span class="pointer-events-none me-2 flex-1">
			<RiGoogleFill
				class="opacity-60"
				width="16"
				height="16"
				aria-hidden="true"
			/>
		</span>
		Login with Google
	</Button>
	<Button class="bg-[#14171a] text-white after:flex-1 hover:bg-[#14171a]/90">
		<span class="pointer-events-none me-2 flex-1">
			<RiTwitterXFill
				class="opacity-60"
				width="16"
				height="16"
				aria-hidden="true"
			/>
		</span>
		Login with X
	</Button>
	<Button class="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90">
		<span class="pointer-events-none me-2 flex-1">
			<RiFacebookFill
				class="opacity-60"
				width="16"
				height="16"
				aria-hidden="true"
			/>
		</span>
		Login with Facebook
	</Button>
	<Button class="bg-[#333333] text-white after:flex-1 hover:bg-[#333333]/90">
		<span class="pointer-events-none me-2 flex-1">
			<RiGithubFill
				class="opacity-60"
				width="16"
				height="16"
				aria-hidden="true"
			/>
		</span>
		Login with GitHub
	</Button>
</div>

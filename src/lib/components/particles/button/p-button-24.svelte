<script lang="ts">
  import RiFacebookFill from "svelte-remix/FacebookFillLogos.svelte";
  import RiGithubFill from "svelte-remix/GithubFillLogos.svelte";
  import RiGoogleFill from "svelte-remix/GoogleFillLogos.svelte";
  import RiTwitterXFill from "svelte-remix/TwitterXFillLogos.svelte";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="inline-flex flex-wrap gap-2">
  <Button aria-label="Login with Google" size="icon" variant="outline">
    <RiGoogleFill aria-hidden="true" />
  </Button>
  <Button aria-label="Login with Facebook" size="icon" variant="outline">
    <RiFacebookFill aria-hidden="true" />
  </Button>
  <Button aria-label="Login with X" size="icon" variant="outline">
    <RiTwitterXFill aria-hidden="true" />
  </Button>
  <Button aria-label="Login with GitHub" size="icon" variant="outline">
    <RiGithubFill aria-hidden="true" />
  </Button>
</div>

<script lang="ts">
  import RiFacebookFill from "$lib/icons/FacebookFillLogos.svelte";
  import RiGithubFill from "$lib/icons/GithubFillLogos.svelte";
  import RiGoogleFill from "$lib/icons/GoogleFillLogos.svelte";
  import RiTwitterXFill from "$lib/icons/TwitterXFillLogos.svelte";
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

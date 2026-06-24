<script lang="ts">
  import RiGithubFill from "svelte-remix/GithubFillLogos.svelte";
  import RiGoogleFill from "svelte-remix/GoogleFillLogos.svelte";
  import RiTwitterXFill from "svelte-remix/TwitterXFillLogos.svelte";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="flex flex-col gap-2">
  <Button variant="outline">
    <RiGoogleFill aria-hidden="true" />
    <span class="flex-1">Login with Google</span>
  </Button>
  <Button variant="outline">
    <RiTwitterXFill aria-hidden="true" />
    <span class="flex-1">Login with X</span>
  </Button>
  <Button variant="outline">
    <RiGithubFill aria-hidden="true" />
    <span class="flex-1">Login with GitHub</span>
  </Button>
</div>

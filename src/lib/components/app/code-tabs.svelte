<script lang="ts">
  import type { Snippet } from "svelte";
  import Tabs from "$lib/components/ui/tabs/tabs.svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  let installationType = $state<"cli" | "manual">("cli");
</script>

<Tabs
  class="relative mt-6 w-full"
  onValueChange={(value) => (installationType = value as "cli" | "manual")}
  value={installationType}
>
  {@render children?.()}
</Tabs>

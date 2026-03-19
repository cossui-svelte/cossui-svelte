<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog } from "bits-ui";

  type Props = AlertDialog.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<AlertDialog.Root {...restProps}>
  {@render children?.()}
</AlertDialog.Root>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";

  type Props = Omit<Combobox.RootProps, "type"> & {
    children?: Snippet;
    type?: "single" | "multiple";
  };

  let { children, type = "single", ...restProps }: Props = $props();
</script>

<Combobox.Root {...{ type, ...restProps } as Combobox.RootProps}>
  {@render children?.()}
</Combobox.Root>

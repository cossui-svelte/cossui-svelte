<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";

  type SingleRootProps = Extract<Combobox.RootProps, { type: "single" }>;
  type Props = Omit<SingleRootProps, "type"> & { type?: "single" | "multiple"; children?: Snippet };

  let { children, type = "single", ...restProps }: Props = $props();
</script>

<Combobox.Root {type} {...(restProps as any)}>
  {@render children?.()}
</Combobox.Root>

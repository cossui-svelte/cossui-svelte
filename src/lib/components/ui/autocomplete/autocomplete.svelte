<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";

  type SingleRootProps = Extract<Combobox.RootProps, { type: "single" }>;
  type Props = (Combobox.RootProps | (Omit<SingleRootProps, "type"> & { type?: undefined })) & {
    children?: Snippet;
  };

  let { children, ...rootProps }: Props = $props();
</script>

<Combobox.Root type="single" {...rootProps}>
  {@render children?.()}
</Combobox.Root>

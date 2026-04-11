<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { Select } from "bits-ui";

  type Props = Select.RootProps & { children?: Snippet };

  let { children, onValueChange, ...restProps }: Props = $props();

  let selectedLabel = $state("");

  setContext("coss-select", {
    getLabel: () => selectedLabel,
    setLabel: (label: string) => {
      selectedLabel = label;
    },
  });

  function handleValueChange(value: string[]): void {
    onValueChange?.(value as never);
  }
</script>

<Select.Root onValueChange={handleValueChange} {...restProps}>
  {@render children?.()}
</Select.Root>

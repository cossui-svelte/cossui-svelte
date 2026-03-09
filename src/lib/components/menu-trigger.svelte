<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  type Props = DropdownMenu.TriggerProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Trigger class={className} data-slot="menu-trigger" {...restProps}>
  {@render children?.()}
</DropdownMenu.Trigger>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { RadioGroup } from "bits-ui";
  import { cn } from "../utils.js";

  type Props = RadioGroup.RootProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<RadioGroup.Root
  class={cn("flex flex-col gap-3", className)}
  data-slot="radio-group"
  {...restProps}
>
  {@render children?.()}
</RadioGroup.Root>

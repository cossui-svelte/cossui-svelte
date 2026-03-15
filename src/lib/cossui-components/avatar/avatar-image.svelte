<script lang="ts">
  import { Avatar } from "bits-ui";
  import { cn } from "../../utils.js";

  type Props = Avatar.ImageProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<Avatar.Image
  class={cn("size-full object-cover", className)}
  data-slot="avatar-image"
  {...restProps}
/>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
    class?: string;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<section class={className} {...restProps}>
  <div class="container flex flex-col items-center gap-2 px-0 py-8 text-center md:py-12 lg:py-16 xl:gap-4">
    {@render children?.()}
  </div>
</section>

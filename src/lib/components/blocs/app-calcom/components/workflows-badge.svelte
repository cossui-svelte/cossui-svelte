<script lang="ts">
  import SparklesIcon from '@lucide/svelte/icons/sparkles';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className }: { class?: string } = $props();
</script>

<Badge
  class={cn(
    'pointer-events-none ms-auto border-none bg-background bg-linear-to-r from-purple-500/8 to-pink-500/12 text-fuchsia-700 md:max-lg:absolute md:max-lg:-end-1 md:max-lg:-top-1 dark:from-purple-500/16 dark:to-pink-500/20 dark:text-fuchsia-400',
    className
  )}
>
  <SparklesIcon />
  <span class="md:max-lg:sr-only">Cal.ai</span>
</Badge>

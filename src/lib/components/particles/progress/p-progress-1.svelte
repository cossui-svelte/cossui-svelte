<script lang="ts">
  import { Progress } from '#lib/components/ui/progress/index.js';

  let value = $state(20);

  $effect(() => {
    const interval = setInterval(() => {
      value = Math.min(100, Math.round(value + Math.random() * 25));
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<Progress {value} />

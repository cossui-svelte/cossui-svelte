<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';

  let isLoading = $state(false);

  function handleClick() {
    isLoading = true;
    setTimeout(() => (isLoading = false), 1000);
  }
</script>

<Button loading={isLoading} onclick={handleClick}>Submit</Button>

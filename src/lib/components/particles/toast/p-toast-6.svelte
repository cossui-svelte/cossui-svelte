<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";

  const TEXTS = [
    "Short message.",
    "A bit longer message that spans two lines.",
    "This is a longer description that intentionally takes more vertical space to demonstrate stacking with varying heights.",
    "An even longer description that should span multiple lines so we can verify the clamped collapsed height and smooth expansion animation when hovering or focusing the viewport.",
  ];

  let count = $state(0);

  function createToast() {
    count++;
    const description = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    toastManager.add({
      description,
      title: `Toast ${count} created`,
    });
  }
</script>

<Button onclick={createToast} variant="outline">With Varying Heights</Button>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";

  async function runPromise() {
    const id = toastManager.add({
      description: "The promise is loading.",
      duration: 0,
      title: "Loading…",
      type: "loading",
    });

    const promise = new Promise<string>((resolve, reject) => {
      const shouldSucceed = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldSucceed) {
          resolve("Data loaded successfully");
        } else {
          reject(new Error("Failed to load data"));
        }
      }, 2000);
    });

    try {
      const data = await promise;
      toastManager.dismiss(id);
      toastManager.add({
        description: `Success: ${data}`,
        title: "This is a success toast!",
        type: "success",
      });
    } catch {
      toastManager.dismiss(id);
      toastManager.add({
        description: "Please try again.",
        title: "Something went wrong",
        type: "error",
      });
    }
  }
</script>

<Button onclick={runPromise} variant="outline">Run Promise</Button>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";

  let loading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Message: ${formData.get("message") || ""}`);
  }
</script>

<form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <div class="flex flex-col gap-1.5">
    <label class="text-sm font-medium" for="message-6">Message</label>
    <Textarea id="message-6" name="message" placeholder="Type your message here" required />
    <p class="text-destructive text-sm hidden peer-[:invalid]:block">This field is required.</p>
  </div>
  <Button {loading} type="submit">Submit</Button>
</form>

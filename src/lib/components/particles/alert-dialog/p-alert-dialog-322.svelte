<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Textarea } from '$lib/components/ui/textarea';

  let feedback = $state('');
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Feedback</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Send us feedback</DialogTitle>
      <DialogDescription>
        Watch <a class="text-foreground hover:underline" href="#">tutorials</a>, read coss.com's
        <a class="text-foreground hover:underline" href="#">documentation</a>, or join our
        <a class="text-foreground hover:underline" href="#">Discord</a> for community help.
      </DialogDescription>
    </DialogHeader>
    <DialogPanel class="flex flex-col gap-5">
      <Textarea
        aria-label="Send feedback"
        placeholder="How can we improve coss.com?"
        bind:value={feedback}
      />
      <div class="flex flex-col sm:flex-row sm:justify-end">
        <Button>Send feedback</Button>
      </div>
    </DialogPanel>
  </DialogPopup>
</Dialog>

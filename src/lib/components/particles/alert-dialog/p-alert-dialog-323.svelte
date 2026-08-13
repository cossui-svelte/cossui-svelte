<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Label } from '$lib/components/ui/label';
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';
  import { Textarea } from '$lib/components/ui/textarea';

  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let comment = $state('');
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Rating</DialogTrigger>
  <DialogPopup class="gap-0 p-0" showCloseButton={false}>
    <DialogHeader class="border-b pb-4 text-left">
      <DialogTitle>Help us improve</DialogTitle>
    </DialogHeader>
    <DialogPanel class="flex flex-col gap-5">
      <div>
        <fieldset class="flex flex-col gap-4">
          <legend class="font-semibold text-foreground text-lg leading-none pt-2 pb-2">
            How hard was it to set up your account?
          </legend>
          <RadioGroup class="flex-row -space-x-px gap-0 rounded-md shadow-xs" value="0">
            {#each ratings as rating (rating)}
              <Label
                class="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-none transition-[color,box-shadow] first:rounded-s-md last:rounded-e-md has-data-[state=checked]:z-10 has-data-[state=checked]:border-primary/50"
              >
                <Radio class="sr-only after:absolute after:inset-0" value={rating.toString()} />
                {rating}
              </Label>
            {/each}
          </RadioGroup>
        </fieldset>
        <div class="mt-2 flex justify-between text-muted-foreground text-xs">
          <p>Very easy</p>
          <p>Very dificult</p>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Label>Why did you give this rating?</Label>
        <Textarea
          aria-label="Send feedback"
          placeholder="How can we improve coss.com?"
          bind:value={comment}
        />
      </div>

      <Button class="w-full">Send feedback</Button>
    </DialogPanel>
  </DialogPopup>
</Dialog>

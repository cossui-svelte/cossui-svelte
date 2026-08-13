<script lang="ts">
  import MailIcon from '@lucide/svelte/icons/mail';
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
  import { Input } from '$lib/components/ui/input';

  let email = $state('');
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Newsletter</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col items-center gap-2 px-6 pt-6">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
        <svg
          aria-hidden="true"
          class="stroke-zinc-800 dark:stroke-zinc-100"
          height="20"
          viewBox="0 0 32 32"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" fill="none" r="12" stroke-width="8" />
        </svg>
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="sm:text-center">Never miss an update</DialogTitle>
        <DialogDescription class="sm:text-center">
          Subscribe to receive news and special offers.
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="relative">
        <Input
          aria-label="Email"
          class="peer ps-9"
          placeholder="hi@yourcompany.com"
          type="email"
          bind:value={email}
        />
        <div
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
        >
          <MailIcon aria-hidden="true" size={16} />
        </div>
      </div>
      <Button class="w-full">Subscribe</Button>
      <p class="text-center text-muted-foreground text-xs">
        By subscribing you agree to our
        <a class="underline hover:no-underline" href="#">Privacy Policy</a>.
      </p>
    </DialogPanel>
  </DialogPopup>
</Dialog>

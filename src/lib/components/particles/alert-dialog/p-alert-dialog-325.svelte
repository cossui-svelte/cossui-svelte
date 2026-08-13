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
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();

  let name = $state('');
  let email = $state('');
  let password = $state('');
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Sign up</DialogTrigger>
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
        <DialogTitle class="sm:text-center">Sign up coss.com</DialogTitle>
        <DialogDescription class="sm:text-center">
          We just need a few details to get you started.
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label for="{id}-name">Full name</Label>
          <Input id="{id}-name" placeholder="Matt Welsh" required type="text" bind:value={name} />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="{id}-email">Email</Label>
          <Input
            id="{id}-email"
            placeholder="hi@yourcompany.com"
            required
            type="email"
            bind:value={email}
          />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="{id}-password">Password</Label>
          <Input
            id="{id}-password"
            placeholder="Enter your password"
            required
            type="password"
            bind:value={password}
          />
        </div>
      </div>
      <Button class="w-full">Sign up</Button>

      <div
        class="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
      >
        <span class="text-muted-foreground text-xs">Or</span>
      </div>

      <Button variant="outline">Continue with Google</Button>

      <p class="text-center text-muted-foreground text-xs">
        By signing up you agree to our <a class="underline hover:no-underline" href="#">Terms</a>.
      </p>
    </DialogPanel>
  </DialogPopup>
</Dialog>

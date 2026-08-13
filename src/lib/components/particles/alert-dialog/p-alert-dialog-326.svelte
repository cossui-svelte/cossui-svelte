<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
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

  let email = $state('');
  let password = $state('');
  let remember = $state(false);
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Sign in</DialogTrigger>
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
        <DialogTitle class="sm:text-center">Welcome back</DialogTitle>
        <DialogDescription class="sm:text-center">
          Enter your credentials to login to your account.
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
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
      <div class="flex justify-between gap-2">
        <Label class="font-normal text-muted-foreground">
          <Checkbox bind:checked={remember} />
          Remember me
        </Label>
        <a class="text-sm underline hover:no-underline" href="#">Forgot password?</a>
      </div>
      <Button class="w-full">Sign in</Button>

      <div
        class="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
      >
        <span class="text-muted-foreground text-xs">Or</span>
      </div>

      <Button variant="outline">Login with Google</Button>
    </DialogPanel>
  </DialogPopup>
</Dialog>

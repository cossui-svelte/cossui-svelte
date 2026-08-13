<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogClose,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { ScrollArea } from '$lib/components/ui/scroll-area';

  let hasReadToBottom = $state(false);
  let viewportEl = $state<HTMLElement | null>(null);

  function handleScroll() {
    if (!viewportEl) return;
    const scrollPercentage =
      viewportEl.scrollTop / (viewportEl.scrollHeight - viewportEl.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      hasReadToBottom = true;
    }
  }

  $effect(() => {
    viewportEl?.addEventListener('scroll', handleScroll);
    return () => viewportEl?.removeEventListener('scroll', handleScroll);
  });
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Terms & Conditions</DialogTrigger>
  <DialogPopup class="max-h-[min(640px,80vh)] gap-0 p-0" showCloseButton={false}>
    <DialogTitle class="border-b px-6 py-4 text-base">Terms & Conditions</DialogTitle>
    <ScrollArea bind:viewportRef={viewportEl}>
      <div class="px-6 py-4 text-muted-foreground text-sm">
        <div class="flex flex-col gap-4 [&_strong]:font-semibold [&_strong]:text-foreground">
          <div class="flex flex-col gap-1">
            <p><strong>Acceptance of Terms</strong></p>
            <p>
              By accessing and using this website, users agree to comply with and be bound by these
              Terms of Service. Users who do not agree with these terms should discontinue use of
              the website immediately.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>User Account Responsibilities</strong></p>
            <p>
              Users are responsible for maintaining the confidentiality of their account
              credentials. Any activities occurring under a user's account are the sole
              responsibility of the account holder. Users must notify the website administrators
              immediately of any unauthorized account access.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>Content Usage and Restrictions</strong></p>
            <p>
              The website and its original content are protected by intellectual property laws.
              Users may not reproduce, distribute, modify, create derivative works, or commercially
              exploit any content without explicit written permission from the website owners.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>Limitation of Liability</strong></p>
            <p>
              The website provides content "as is" without any warranties. The website owners shall
              not be liable for direct, indirect, incidental, consequential, or punitive damages
              arising from user interactions with the platform.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>User Conduct Guidelines</strong></p>
            <ul class="list-disc pl-6">
              <li>Not upload harmful or malicious content</li>
              <li>Respect the rights of other users</li>
              <li>Avoid activities that could disrupt website functionality</li>
              <li>Comply with applicable local and international laws</li>
            </ul>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>Modifications to Terms</strong></p>
            <p>
              The website reserves the right to modify these terms at any time. Continued use of the
              website after changes constitutes acceptance of the new terms.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>Termination Clause</strong></p>
            <p>
              The website may terminate or suspend user access without prior notice for violations
              of these terms or for any other reason deemed appropriate by the administration.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p><strong>Governing Law</strong></p>
            <p>
              These terms are governed by the laws of the jurisdiction where the website is
              primarily operated, without regard to conflict of law principles.
            </p>
          </div>
        </div>
      </div>
    </ScrollArea>
    <div class="flex flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:items-center">
      {#if !hasReadToBottom}
        <span class="grow text-muted-foreground text-xs max-sm:text-center">
          Read all terms before accepting.
        </span>
      {/if}
      <DialogClose class={buttonVariants({ variant: 'outline' })}>Cancel</DialogClose>
      <DialogClose>
        {#snippet child({ props })}
          <Button disabled={!hasReadToBottom} {...props}>I agree</Button>
        {/snippet}
      </DialogClose>
    </div>
  </DialogPopup>
</Dialog>

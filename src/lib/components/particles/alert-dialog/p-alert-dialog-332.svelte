<script lang="ts">
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import dialogContentImg from '$lib/assets/dialog-content.png';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { cn } from '$lib/utils';

  const stepContent = [
    {
      description:
        'Discover a powerful collection of components designed to enhance your development workflow.',
      title: 'Welcome to coss.com'
    },
    {
      description:
        'Each component is fully customizable and built with modern web standards in mind.',
      title: 'Customizable Components'
    },
    {
      description: 'Begin building amazing interfaces with our comprehensive component library.',
      title: 'Ready to Start?'
    },
    {
      description:
        'Access our extensive documentation and community resources to make the most of coss.com.',
      title: 'Get Support'
    }
  ];

  const totalSteps = stepContent.length;

  let step = $state(1);

  function handleContinue() {
    if (step < totalSteps) {
      step += 1;
    }
  }
</script>

<Dialog
  onOpenChange={(open) => {
    if (open) step = 1;
  }}
>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Onboarding</DialogTrigger>
  <DialogPopup class="gap-0 p-0" showCloseButton={false}>
    <div class="p-2">
      <img alt="dialog" class="w-full rounded-md" height={216} src={dialogContentImg} width={382} />
    </div>
    <div class="flex flex-col gap-6 px-6 pt-3 pb-6">
      <DialogHeader class="p-0">
        <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
        <DialogDescription>{stepContent[step - 1].description}</DialogDescription>
      </DialogHeader>
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div class="flex justify-center gap-1.5 max-sm:order-1">
          {#each { length: totalSteps } as _, index (index)}
            <div
              class={cn('size-1.5 rounded-full bg-primary', index + 1 !== step && 'opacity-20')}
            ></div>
          {/each}
        </div>
        <DialogFooter class="p-0">
          <DialogClose class={buttonVariants({ variant: 'ghost' })}>Skip</DialogClose>
          {#if step < totalSteps}
            <Button class="group" onclick={handleContinue}>
              Next
              <ArrowRightIcon
                aria-hidden="true"
                class="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
              />
            </Button>
          {:else}
            <DialogClose class={buttonVariants()}>Okay</DialogClose>
          {/if}
        </DialogFooter>
      </div>
    </div>
  </DialogPopup>
</Dialog>

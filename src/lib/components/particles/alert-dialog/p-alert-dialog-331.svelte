<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import ImagePlusIcon from '@lucide/svelte/icons/image-plus';
  import XIcon from '@lucide/svelte/icons/x';
  import { buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { useCharacterLimit } from '$lib/hooks/use-character-limit.svelte';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  const id = $props.id();

  const bgUpload = useFileUpload({
    accept: 'image/*',
    initialFiles: [
      {
        id: 'profile-bg-123456789',
        name: 'profile-bg.jpg',
        size: 1528737,
        type: 'image/jpeg',
        url: '/img/avatars/avatar1.jpg'
      }
    ]
  });
  const bgPreview = $derived(bgUpload.files[0]?.preview ?? null);

  const avatarUpload = useFileUpload({
    accept: 'image/*',
    initialFiles: [
      {
        id: 'avatar-123456789',
        name: 'avatar-72-01.jpg',
        size: 1528737,
        type: 'image/jpeg',
        url: '/img/avatars/avatar1.jpg'
      }
    ]
  });
  const avatarPreview = $derived(avatarUpload.files[0]?.preview ?? null);

  const charLimit = useCharacterLimit(
    180,
    'Hey, I am Margaret, a web developer who loves turning ideas into amazing websites!'
  );

  let firstName = $state('Margaret');
  let lastName = $state('Villard');
  let username = $state('margaret-villard-69');
  let website = $state('www.margaret.com');
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Edit profile</DialogTrigger>
  <DialogPopup class="gap-0 overflow-y-visible p-0 sm:max-w-lg" showCloseButton={false}>
    <DialogTitle class="border-b px-6 py-4 text-base">Edit profile</DialogTitle>
    <DialogDescription class="sr-only">
      Make changes to your profile here. You can change your photo and set a username.
    </DialogDescription>
    <div class="overflow-y-auto">
      <div class="h-32">
        <div class="relative flex size-full items-center justify-center overflow-hidden bg-muted">
          {#if bgPreview}
            <img
              alt="Upload preview"
              class="size-full object-cover"
              height={96}
              src={bgPreview}
              width={512}
            />
          {/if}
          <div class="absolute inset-0 flex items-center justify-center gap-2">
            <button
              aria-label={bgPreview ? 'Change image' : 'Upload image'}
              class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onclick={bgUpload.openFileDialog}
              type="button"
            >
              <ImagePlusIcon aria-hidden="true" size={16} />
            </button>
            {#if bgPreview}
              <button
                aria-label="Remove image"
                class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                onclick={() => bgUpload.removeFile(bgUpload.files[0]?.id)}
                type="button"
              >
                <XIcon aria-hidden="true" size={16} />
              </button>
            {/if}
          </div>
        </div>
        <input
          bind:this={bgUpload.fileInput}
          {...bgUpload.inputProps}
          aria-label="Upload image file"
          class="sr-only"
        />
      </div>

      <div class="-mt-10 px-6">
        <div
          class="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-black/10 shadow-xs"
        >
          {#if avatarPreview}
            <img
              alt="Profile"
              class="size-full object-cover"
              height={80}
              src={avatarPreview}
              width={80}
            />
          {/if}
          <button
            aria-label="Change profile picture"
            class="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onclick={avatarUpload.openFileDialog}
            type="button"
          >
            <ImagePlusIcon aria-hidden="true" size={16} />
          </button>
          <input
            bind:this={avatarUpload.fileInput}
            {...avatarUpload.inputProps}
            aria-label="Upload profile picture"
            class="sr-only"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4 px-6 pt-4 pb-6">
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="{id}-first-name">First name</Label>
            <Input
              id="{id}-first-name"
              placeholder="Matt"
              required
              type="text"
              bind:value={firstName}
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="{id}-last-name">Last name</Label>
            <Input
              id="{id}-last-name"
              placeholder="Welsh"
              required
              type="text"
              bind:value={lastName}
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="{id}-username">Username</Label>
          <div class="relative">
            <Input
              id="{id}-username"
              class="peer pe-9"
              placeholder="Username"
              required
              type="text"
              bind:value={username}
            />
            <div
              class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50"
            >
              <CheckIcon aria-hidden="true" class="text-emerald-500" size={16} />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="{id}-website">Website</Label>
          <div class="flex rounded-md shadow-xs">
            <span
              class="-z-10 inline-flex items-center rounded-s-md border border-input bg-background px-3 text-muted-foreground text-sm"
            >
              https://
            </span>
            <Input
              id="{id}-website"
              class="-ms-px rounded-s-none shadow-none"
              placeholder="yourwebsite.com"
              type="text"
              bind:value={website}
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="{id}-bio">Biography</Label>
          <Textarea
            id="{id}-bio"
            aria-describedby="{id}-description"
            maxlength={charLimit.maxLength}
            placeholder="Write a few sentences about yourself"
            bind:value={charLimit.value}
          />
          <p
            aria-live="polite"
            class="mt-2 text-right text-muted-foreground text-xs"
            id="{id}-description"
          >
            <span class="tabular-nums">{charLimit.maxLength - charLimit.characterCount}</span>
            characters left
          </p>
        </div>
      </div>
    </div>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: 'outline' })}>Cancel</DialogClose>
      <DialogClose class={buttonVariants()}>Save changes</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>

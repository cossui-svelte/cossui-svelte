<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import Link from '@lucide/svelte/icons/link-2';
  import { buttonVariants, Button } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { cn } from '#lib/utils.js';
  import { getEditor, useEditorTransaction } from '../../tiptap';
  import Tooltip from '../Tooltip.svelte';

  let open = $state(false);

  let value = $state('');
  const editor = getEditor();
  const transaction = useEditorTransaction(editor);
  function isActive() {
    void transaction.version;
    return editor.isActive('link');
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const href = value.trim();
    if (!href) return;
    editor.chain().focus().setLink({ href }).run();
    value = '';
    open = false;
  }
</script>

<Popover bind:open>
  <Tooltip tooltip="Link" as="span" class="inline-flex">
    <PopoverTrigger
      aria-label="Link"
      class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), isActive() && 'bg-muted')}
    >
      <Link />
      <ChevronDown class="size-2! text-muted-foreground" />
    </PopoverTrigger>
  </Tooltip>
  <PopoverPopup class="h-fit w-80 rounded-lg p-0!">
    <form class="flex items-center gap-0.5" onsubmit={handleSubmit}>
      <Input placeholder="Type or paste a link..." bind:value required type="url" />
      <Tooltip tooltip="Insert link" as="span" class="inline-flex">
        <Button type="submit" size="icon">
          <Check />
        </Button>
      </Tooltip>
    </form>
  </PopoverPopup>
</Popover>

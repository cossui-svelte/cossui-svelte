<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import Image from '@lucide/svelte/icons/image';
  import Link from '@lucide/svelte/icons/link-2';
  import List from '@lucide/svelte/icons/list';
  import Plus from '@lucide/svelte/icons/plus';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { commands } from '#lib/components/ui/rich-editor/commands/index.ts';
  import { quickcolors } from '#lib/components/ui/rich-editor/helpers.ts';
  import { createEditor, RichEditor } from '#lib/components/ui/rich-editor/index.ts';
  import { useEditorTransaction } from '#lib/components/ui/rich-editor/tiptap/index.ts';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { cn } from '#lib/utils.js';

  const editor = createEditor({});
  const transaction = editor ? useEditorTransaction(editor) : undefined;

  const all = Object.values(commands).flat();
  const byName = (name: string) => all.find((c) => c.name === name);
  const run = (name: string) => {
    if (editor) byName(name)?.onClick?.(editor);
  };
  const active = (name: string) => {
    void transaction?.version;
    return editor ? (byName(name)?.isActive?.(editor) ?? false) : false;
  };

  const textStyles = ['paragraph', 'h1', 'h2', 'h3'];
  const moreMarks = ['underline', 'strikethrough', 'code', 'superscript', 'subscript'];
  const lists = ['bulletList', 'orderedList', 'taskList'];
  const inserts = ['blockQuote', 'codeBlock', 'table'];
  const iconButton = buttonVariants({ variant: 'ghost', size: 'icon' });
</script>

<RichEditor {editor}>
  <div class="comment-editor w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-xs">
    <div class="flex items-center gap-1 overflow-x-auto border-b px-2 py-1.5">
      <Menu>
        <MenuTrigger class={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          Aa <ChevronDown class="size-3 opacity-70" />
        </MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            {#each textStyles as name (name)}
              {@const cmd = byName(name)}
              {#if cmd}
                <MenuItem onclick={() => run(name)}><cmd.icon />{cmd.tooltip}</MenuItem>
              {/if}
            {/each}
          </MenuGroup>
        </MenuPopup>
      </Menu>
      <Separator class="mx-1 h-5!" orientation="vertical" />

      {#each ['bold', 'italic'] as name (name)}
        {@const cmd = byName(name)}
        {#if cmd}
          <Button
            aria-label={cmd.tooltip}
            class={cn(active(name) && 'bg-muted text-primary')}
            size="icon"
            variant="ghost"
            onmousedown={(e: MouseEvent) => e.preventDefault()}
            onclick={() => run(name)}
          >
            <cmd.icon />
          </Button>
        {/if}
      {/each}
      <Menu>
        <MenuTrigger aria-label="More formatting" class={iconButton}><Ellipsis /></MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            {#each moreMarks as name (name)}
              {@const cmd = byName(name)}
              {#if cmd}
                <MenuItem onclick={() => run(name)}><cmd.icon />{cmd.tooltip}</MenuItem>
              {/if}
            {/each}
          </MenuGroup>
        </MenuPopup>
      </Menu>
      <Separator class="mx-1 h-5!" orientation="vertical" />

      <Menu>
        <MenuTrigger
          aria-label="Text color"
          class={buttonVariants({ variant: 'ghost', size: 'sm' })}
        >
          <span class="font-semibold underline underline-offset-4">A</span>
          <ChevronDown class="size-3 opacity-70" />
        </MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            {#each quickcolors as color (color.label)}
              <MenuItem
                onclick={() =>
                  color.value
                    ? editor?.chain().focus().setColor(color.value).run()
                    : editor?.chain().focus().unsetColor().run()}
              >
                <span class="w-4 text-center font-bold" style:color={color.value || undefined}
                  >A</span
                >
                {color.label}
              </MenuItem>
            {/each}
          </MenuGroup>
        </MenuPopup>
      </Menu>
      <Separator class="mx-1 h-5!" orientation="vertical" />

      <Menu>
        <MenuTrigger aria-label="Lists" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          <List />
          <ChevronDown class="size-3 opacity-70" />
        </MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            {#each lists as name (name)}
              {@const cmd = byName(name)}
              {#if cmd}
                <MenuItem onclick={() => run(name)}><cmd.icon />{cmd.tooltip}</MenuItem>
              {/if}
            {/each}
          </MenuGroup>
        </MenuPopup>
      </Menu>
      <Separator class="mx-1 h-5!" orientation="vertical" />

      <Button
        aria-label="Link"
        class={cn(active('link') && 'bg-muted text-primary')}
        size="icon"
        variant="ghost"
        onclick={() => run('link')}
      >
        <Link />
      </Button>
      <Button
        aria-label="Image"
        size="icon"
        variant="ghost"
        onclick={() => run('image-placeholder')}
      >
        <Image />
      </Button>
      <Menu>
        <MenuTrigger aria-label="Insert" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          <Plus />
          <ChevronDown class="size-3 opacity-70" />
        </MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            {#each inserts as name (name)}
              {@const cmd = byName(name)}
              {#if cmd}
                <MenuItem onclick={() => run(name)}><cmd.icon />{cmd.tooltip}</MenuItem>
              {/if}
            {/each}
          </MenuGroup>
        </MenuPopup>
      </Menu>
    </div>
    <div class="h-48 overflow-y-auto px-4 py-4 text-sm">
      <RichEditor.Content class="*:outline-none" />
    </div>
  </div>
</RichEditor>

<style>
  :global(.comment-editor .tiptap) {
    min-height: 100%;
  }

  :global(.comment-editor .tiptap > p) {
    margin: 0;
  }

  :global(.comment-editor .tiptap p.is-empty::before) {
    content: 'Type your description here...';
  }
</style>

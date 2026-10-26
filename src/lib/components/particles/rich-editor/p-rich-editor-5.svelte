<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import Minus from '@lucide/svelte/icons/minus';
  import RemoveFormatting from '@lucide/svelte/icons/remove-formatting';
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

  const textStyles = ['paragraph', 'h1', 'h2', 'h3', 'h4'];
  const groups = [
    ['italic', 'bold', 'code', 'strikethrough'],
    null,
    ['bulletList', 'orderedList'],
    ['link', 'image-placeholder', 'blockQuote', 'codeBlock']
  ];
</script>

<RichEditor {editor}>
  <div class="comment-editor w-full max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-xs">
    <div class="flex items-center gap-1 overflow-x-auto border-b px-1.5 py-1.5">
      <Menu>
        <MenuTrigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
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

      {#each groups as group, i (i)}
        {#if group === null}
          <Button
            aria-label="Clear formatting"
            size="icon-sm"
            variant="outline"
            onclick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
          >
            <RemoveFormatting />
          </Button>
          <Separator class="mx-1 h-5!" orientation="vertical" />
          <Menu>
            <MenuTrigger
              aria-label="Text color"
              class={buttonVariants({ variant: 'outline', size: 'sm' })}
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
        {:else}
          {#each group as name (name)}
            {@const cmd = byName(name)}
            {#if cmd}
              <Button
                aria-label={cmd.tooltip}
                class={cn(active(name) && 'bg-muted text-primary')}
                size="icon-sm"
                variant="outline"
                onmousedown={(e: MouseEvent) => e.preventDefault()}
                onclick={() => run(name)}
              >
                <cmd.icon />
              </Button>
            {/if}
          {/each}
        {/if}
        <Separator class="mx-1 h-5!" orientation="vertical" />
      {/each}

      <Button
        aria-label="Horizontal rule"
        size="icon-sm"
        variant="outline"
        onclick={() => editor?.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </Button>
    </div>
    <div class="h-44 overflow-y-auto px-4 py-4 text-sm">
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
    content: 'This is your placeholder...';
  }
</style>

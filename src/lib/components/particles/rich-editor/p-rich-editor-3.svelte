<script lang="ts">
  import Bold from '@lucide/svelte/icons/bold';
  import Code from '@lucide/svelte/icons/code-xml';
  import Italic from '@lucide/svelte/icons/italic';
  import Strikethrough from '@lucide/svelte/icons/strikethrough';
  import { createEditor, RichEditor } from '#lib/components/ui/rich-editor/index.ts';
  import { useEditorTransaction } from '#lib/components/ui/rich-editor/tiptap/index.ts';
  import { Toggle } from '#lib/components/ui/toggle/index.js';

  const editor = createEditor({});
  const transaction = editor ? useEditorTransaction(editor) : undefined;

  const marks = [
    {
      name: 'bold',
      label: 'Bold',
      icon: Bold,
      toggle: () => editor?.chain().focus().toggleBold().run()
    },
    {
      name: 'italic',
      label: 'Italic',
      icon: Italic,
      toggle: () => editor?.chain().focus().toggleItalic().run()
    },
    {
      name: 'strike',
      label: 'Strikethrough',
      icon: Strikethrough,
      toggle: () => editor?.chain().focus().toggleStrike().run()
    },
    {
      name: 'code',
      label: 'Code',
      icon: Code,
      toggle: () => editor?.chain().focus().toggleCode().run()
    }
  ];

  function isActive(name: string): boolean {
    void transaction?.version;
    return editor?.isActive(name) ?? false;
  }
</script>

<RichEditor {editor}>
  <div class="comment-editor w-full max-w-sm overflow-hidden rounded-2xl border bg-card shadow-xs">
    <div class="h-40 overflow-y-auto px-4 py-3 text-sm">
      <RichEditor.Content class="*:outline-none" />
    </div>
    <div class="flex items-center gap-1 border-t px-2 py-2">
      {#each marks as mark (mark.name)}
        <Toggle
          aria-label={mark.label}
          pressed={isActive(mark.name)}
          size="sm"
          onmousedown={(e: MouseEvent) => e.preventDefault()}
          onclick={mark.toggle}
        >
          <mark.icon />
        </Toggle>
      {/each}
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
    content: 'Comment here...';
  }
</style>

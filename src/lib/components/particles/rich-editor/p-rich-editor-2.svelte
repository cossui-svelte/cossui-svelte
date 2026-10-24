<script lang="ts">
  import {
    createEditor,
    RichEditor,
    type JSONContent
  } from '#lib/components/ui/rich-editor/index.ts';

  const initialContent: JSONContent = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'Notion Like' }]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Start writing, or press "/" for commands. This editor is built for focused, block-based writing.'
          }
        ]
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Getting started' }]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Drag blocks by the handle on the left. Select text to format it, or type "/" to insert new blocks.'
          }
        ]
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Drag and drop to reorder blocks' }]
              }
            ]
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Use the table of contents on the right to navigate'
                  }
                ]
              }
            ]
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Hover a block for its handle and menu'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Notes' }]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Keep this page focused. The table of contents updates as you add headings.'
          }
        ]
      }
    ]
  };

  const editor = createEditor({});

  if (editor) {
    editor.commands.setContent(initialContent, { emitUpdate: false });
  }
</script>

<RichEditor {editor}>
  <div class="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
    <RichEditor.Content class="*:outline-none" />
  </div>

  <RichEditor.BubbleMenu />
  <RichEditor.DragHandleExtended />
  <RichEditor.ToC />
</RichEditor>

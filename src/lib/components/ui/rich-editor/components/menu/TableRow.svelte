<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowDownFromLine from '@lucide/svelte/icons/arrow-down-from-line';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import ArrowUpFromLine from '@lucide/svelte/icons/arrow-up-from-line';
  import Sheet from '@lucide/svelte/icons/sheet';
  import Trash from '@lucide/svelte/icons/trash';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import {
    isRowGripSelected,
    moveRowDown,
    moveRowUp
  } from '../../tiptap/extensions/table/utils.js';
  import { BubbleMenu, getEditor } from '../../tiptap/index.js';

  const editor = getEditor();
</script>

<BubbleMenu
  {editor}
  pluginKey="table-row-menu"
  shouldShow={(props) => {
    const { editor: propsEditor, state, view, from } = props;
    if (!propsEditor || !propsEditor.isEditable) return false;
    if (!state) return false;
    return isRowGripSelected({ editor: propsEditor, view, state, from });
  }}
  options={{
    shift: true,
    autoPlacement: {
      allowedPlacements: ['top', 'bottom']
    },
    strategy: 'absolute',
    scrollTarget: editor.view.dom.parentElement ?? window
  }}
  class="z-50 flex h-fit w-fit flex-col gap-1 rounded-lg border bg-popover! p-2"
>
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Header row"
    onclick={() => editor.chain().focus().toggleHeaderRow().run()}
  >
    <Sheet />
    Header row
  </button>
  <Separator />
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Add row after"
    onclick={() => editor.chain().focus().addRowAfter().run()}
  >
    <ArrowDownFromLine />
    Add row after
  </button>
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Add row before"
    onclick={() => editor.chain().focus().addRowBefore().run()}
  >
    <ArrowUpFromLine />
    Add row before
  </button>
  <Separator />
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Move row up"
    onclick={() => editor.view.dispatch(moveRowUp(editor.state.tr))}
  >
    <ArrowUp />
    Move row up
  </button>
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Move row down"
    onclick={() => editor.view.dispatch(moveRowDown(editor.state.tr))}
  >
    <ArrowDown />
    Move row down
  </button>
  <Separator />
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Delete row"
    data-variant="destructive"
    onclick={() => editor.chain().focus().deleteRow().run()}
  >
    <Trash />
    Delete row
  </button>
</BubbleMenu>

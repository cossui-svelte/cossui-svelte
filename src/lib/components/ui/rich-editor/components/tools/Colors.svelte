<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import { quickcolors } from '../../helpers';
  import { getEditor, useEditorState } from '../../tiptap';
  import Tooltip from '../Tooltip.svelte';

  let open = $state(false);
  const editor = getEditor();
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      currentColor: editor.getAttributes('textStyle').color,
      currentHighlight: editor.getAttributes('highlight').color
    })
  });
</script>

<Menu bind:open>
  <Tooltip tooltip="Quick Colors" as="span" class="inline-flex">
    <MenuTrigger
      class={buttonVariants({
        variant: 'ghost',
        size: 'icon',
        class: cn('gap-0.5')
      })}
      style={`color: ${$editorState.currentColor || ''}; background-color: ${$editorState.currentHighlight || ''};`}
    >
      <span>A</span>
      <ChevronDown class="size-2! text-muted-foreground" />
    </MenuTrigger>
  </Tooltip>
  <MenuPopup class="max-h-96 min-w-48 overflow-auto rounded-lg duration-300">
    <MenuGroup>
      <MenuGroupLabel>Text Colors</MenuGroupLabel>
      {#each quickcolors as color (color.label)}
        {@const isActive =
          color.value === ''
            ? !$editorState.currentColor
            : $editorState.currentColor === color.value}
        <MenuItem
          title={color.label}
          class="flex cursor-pointer items-center justify-between"
          onclick={() => {
            if (color.value === '' || color.label === 'Default') {
              editor.chain().focus().unsetColor().run();
            } else {
              editor.chain().focus().setColor(color.value).run();
            }
          }}
        >
          <div class="flex items-center gap-2">
            <span
              class="w-4 text-center font-bold"
              style={color.value ? `color: ${color.value};` : ''}>A</span
            >
            <span class="capitalize">{color.label}</span>
          </div>
          {#if isActive}
            <Check class="size-4 text-muted-foreground" />
          {/if}
        </MenuItem>
      {/each}
    </MenuGroup>
    <MenuSeparator />
    <MenuGroup>
      <MenuGroupLabel>Background Colors</MenuGroupLabel>
      {#each quickcolors as color (color.label)}
        {@const isActive =
          color.value === ''
            ? !$editorState.currentHighlight
            : $editorState.currentHighlight === `${color.value}50`}
        <MenuItem
          title={color.label}
          class="flex cursor-pointer items-center justify-between"
          onclick={() => {
            if (color.value === '' || color.label === 'Default') {
              editor.chain().focus().unsetHighlight().run();
            } else {
              editor
                .chain()
                .focus()
                .setHighlight({ color: `${color.value}50` })
                .run();
            }
          }}
        >
          <div class="flex items-center gap-2">
            <span
              class="size-4 rounded-full border"
              style={`background-color: ${color.value ? `${color.value}50` : 'transparent'};`}
            ></span>
            <span class="capitalize">{color.label}</span>
          </div>
          {#if isActive}
            <Check class="size-4 text-muted-foreground" />
          {/if}
        </MenuItem>
      {/each}
    </MenuGroup>
  </MenuPopup>
</Menu>

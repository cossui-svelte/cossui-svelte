<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuShortcut,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { getEditor, useEditorTransaction } from '../../tiptap';
  import Tooltip from '../Tooltip.svelte';

  const editor = getEditor();
  const transaction = useEditorTransaction(editor);

  const currentSize = () => {
    void transaction.version;
    return editor.getAttributes('textStyle').fontSize || '';
  };

  const FONT_SIZE = [
    { label: 'Tiny', value: '0.7rem' },
    { label: 'Smaller', value: '0.75rem' },
    { label: 'Small', value: '0.9rem' },
    { label: 'Default', value: '' },
    { label: 'Large', value: '1.25rem' },
    { label: 'Extra Large', value: '1.5rem' }
  ];

  const currentLabel = $derived.by(() => {
    const l = FONT_SIZE.find((f) => f.value === currentSize());
    if (l) return l.label.split(' ')[0];
    return 'Medium';
  });
</script>

<Menu>
  <Tooltip tooltip="Font Size">
    <MenuTrigger
      class={buttonVariants({
        variant: 'ghost'
      })}
    >
      <span>{currentLabel}</span>
      <ChevronDown class="size-2! text-muted-foreground" />
    </MenuTrigger>
  </Tooltip>
  <MenuPopup class="w-fit">
    <MenuGroup>
      <MenuGroupLabel>Font Size</MenuGroupLabel>
      {#each FONT_SIZE as fontSize (fontSize)}
        <MenuItem
          onclick={() => {
            editor.chain().focus().setFontSize(fontSize.value).run();
          }}
          >{fontSize.label}
          <MenuShortcut>
            {fontSize.value}
          </MenuShortcut>
        </MenuItem>
      {/each}
    </MenuGroup>
  </MenuPopup>
</Menu>

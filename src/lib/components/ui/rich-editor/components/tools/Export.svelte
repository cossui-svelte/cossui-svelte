<script lang="ts">
  import { ChevronDown, Download } from '@lucide/svelte';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { getEditor } from '../../tiptap/index.js';
  const editor = getEditor();
  const handleExport = (as: 'markdown' | 'html' | 'json') => {
    let text = '';
    let mimeType = '';
    let extension = '';

    switch (as) {
      case 'markdown':
        text = editor.getMarkdown();
        mimeType = 'text/markdown;charset=utf-8';
        extension = 'md';
        break;
      case 'html':
        text = editor.getHTML();
        mimeType = 'text/html;charset=utf-8';
        extension = 'html';
        break;
      case 'json':
        text = JSON.stringify(editor.getJSON(), null, 2);
        mimeType = 'application/json;charset=utf-8';
        extension = 'json';
        break;
    }

    // Try to find a title from the first heading, or use a default
    let filename = 'document';
    const firstNode = editor.state.doc.firstChild;
    if (firstNode && firstNode.type.name === 'heading') {
      const textContent = firstNode.textContent.trim();
      if (textContent) {
        filename = textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    }
    if (!filename) {
      filename = 'document';
    }

    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
    <Download />
    <ChevronDown class="size-2! text-muted-foreground" />
  </MenuTrigger>
  <MenuPopup>
    <MenuGroupLabel>Export As</MenuGroupLabel>
    <MenuItem onclick={() => handleExport('markdown')}>Markdown</MenuItem>
    <MenuItem onclick={() => handleExport('html')}>HTML</MenuItem>
    <MenuItem onclick={() => handleExport('json')}>JSON</MenuItem>
  </MenuPopup>
</Menu>

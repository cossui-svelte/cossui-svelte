<script lang="ts">
  import mermaid from 'mermaid';
  import './editor.css';
  import { mode } from 'mode-watcher';
  import { cn } from '#lib/utils.js';
  import {
    MathBlock,
    Link,
    MathInline,
    TableColMenu,
    TableRowMenu
  } from './components/menu/index.js';
  import TiptapContent from './tiptap/components/TiptapContent.svelte';

  interface Props {
    class?: string;
  }
  const { class: className = '' }: Props = $props();

  mermaid.initialize({
    startOnLoad: false,
    theme: mode.current === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit'
  });
</script>

<Link />
<MathBlock />
<MathInline />
<TableColMenu />
<TableRowMenu />
<TiptapContent class={cn('relative', className)} />

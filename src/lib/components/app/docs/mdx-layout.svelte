<script lang="ts" module>
  import A from './mdx/a.svelte';
  import Blockquote from './mdx/blockquote.svelte';
  import Code from './mdx/code.svelte';
  import H1 from './mdx/h1.svelte';
  import H2 from './mdx/h2.svelte';
  import H3 from './mdx/h3.svelte';
  import H4 from './mdx/h4.svelte';
  import H5 from './mdx/h5.svelte';
  import H6 from './mdx/h6.svelte';
  import Hr from './mdx/hr.svelte';
  import Img from './mdx/img.svelte';
  import Li from './mdx/li.svelte';
  import Ol from './mdx/ol.svelte';
  import P from './mdx/p.svelte';
  import Pre from './mdx/pre.svelte';
  import Strong from './mdx/strong.svelte';
  import Table from './mdx/table.svelte';
  import Td from './mdx/td.svelte';
  import Th from './mdx/th.svelte';
  import Tr from './mdx/tr.svelte';
  import Ul from './mdx/ul.svelte';

  // mdsvex swaps each markdown-generated tag for the component exported under its name.
  export {
    A as a,
    Blockquote as blockquote,
    Code as code,
    H1 as h1,
    H2 as h2,
    H3 as h3,
    H4 as h4,
    H5 as h5,
    H6 as h6,
    Hr as hr,
    Img as img,
    Li as li,
    Ol as ol,
    P as p,
    Pre as pre,
    Strong as strong,
    Table as table,
    Td as td,
    Th as th,
    Tr as tr,
    Ul as ul
  };
</script>

<script lang="ts">
  let { children } = $props();
</script>

{@render children?.()}

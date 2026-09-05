import GithubSlugger from 'github-slugger';
import remarkGfm from 'remark-gfm';
import { codeToHtml } from 'shiki';
import { visit } from 'unist-util-visit';

/**
 * mdsvex requires every custom component used in a .mdx file's markup to be
 * imported in that file's own instance script (see mdsvex README) — there's
 * no MDXProvider-style global registration. Rather than repeat the same
 * imports across every docs page, inject one shared instance-script block
 * covering every custom tag actually used live (outside code fences/inline
 * code) across src/lib/content/docs/**\/*.mdx.
 */
function remarkInjectDocsComponents() {
  const script = `<script>
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
  import { TabsList, TabsPanel, TabsTab } from '$lib/components/ui/tabs';
  import CodeTabs from '$lib/components/app/docs/code-tabs.svelte';
  import ComponentPreview from '$lib/components/app/docs/component-preview.svelte';
  import ComponentSource from '$lib/components/app/docs/component-source.svelte';
  import Step from '$lib/components/app/docs/step.svelte';
  import Steps from '$lib/components/app/docs/steps.svelte';
  import InfoIcon from '@lucide/svelte/icons/info';
</script>
`;

  return (tree) => {
    const hasOwnScript = tree.children.some(
      (node) => node.type === 'html' && /^<script[\s>]/.test(node.value)
    );
    if (hasOwnScript) return;
    tree.children.unshift({ type: 'html', value: script });
  };
}

/** Collects h2/h3 headings into `metadata.toc` and gives them matching `id`s, mirroring the TOC extraction `docs-toc.svelte` expects. */
function remarkToc() {
  return (tree, file) => {
    const slugger = new GithubSlugger();
    const toc = [];

    visit(tree, 'heading', (node) => {
      if (node.depth < 2 || node.depth > 3) return;

      const title = node.children
        .filter((child) => 'value' in child)
        .map((child) => child.value)
        .join('');
      if (!title) return;

      const id = slugger.slug(title);
      node.data ??= {};
      node.data.hProperties = { ...node.data.hProperties, id };
      toc.push({ depth: node.depth, title, url: `#${id}` });
    });

    file.data.fm = { ...file.data.fm, toc };
  };
}

const TITLE_META_RE = /title="([^"]+)"/;

/**
 * mdsvex re-parses highlighted output as Svelte template source, which is
 * stricter than an HTML parser about two things Shiki's HTML renderer
 * doesn't fully escape in code content: Shiki escapes `<` but leaves `>`
 * bare (so a decoded `<Word>` sample, e.g. `<Accordion>`, reads as a real
 * component tag), and raw `{`/`}` are Svelte expression syntax (so a JS/TSX
 * sample like `Inter({ variable: ... })` reads as a template expression).
 * Escape all three in text-node content only, never inside a tag's own
 * markup, to keep highlighted code samples inert.
 */
function escapeTextNodesForSvelte(html) {
  return html.replace(/(?<=>)([^<]*)(?=<)/g, (text) =>
    text.replaceAll('>', '&gt;').replaceAll('{', '&lbrace;').replaceAll('}', '&rbrace;')
  );
}

/** Build-time only (runs while Vite processes .svx files) — mirrors the static parts of code-block.svelte's markup so highlighted fences look consistent, minus the interactive copy button. */
async function highlighter(code, lang = 'text', meta = '') {
  const html = escapeTextNodesForSvelte(
    await codeToHtml(code, {
      lang,
      themes: { dark: 'github-dark-default', light: 'github-light-default' }
    })
  );
  const title = meta?.match(TITLE_META_RE)?.[1];
  const figcaption = title
    ? `<figcaption data-rehype-pretty-code-title>${title}</figcaption>`
    : '';

  return `<figure data-rehype-pretty-code-figure>${figcaption}<div class="overflow-x-auto">${html}</div></figure>`;
}

export const mdsvexOptions = {
  extensions: ['.mdx'],
  highlight: { highlighter },
  remarkPlugins: [remarkGfm, remarkInjectDocsComponents, remarkToc]
};

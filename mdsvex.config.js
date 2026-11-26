import { createHighlighter } from 'shiki';

/**
 * mdsvex requires every capitalised component used in a .mdx file's markup to be
 * imported in that file's own instance script — there's no MDXProvider-style
 * global registration. Rather than repeat the same imports across every docs
 * page, inject one shared instance-script block covering every custom tag
 * actually used live (outside code fences/inline code) across
 * src/lib/components/app/content/**\/*.mdx.
 *
 * mdsvex 1.0 has no remark plugins, so this runs as a Vite transform ahead of
 * mdsvex's own (both are `enforce: 'pre'`; this one is listed first).
 */
const DOCS_SCRIPT = `<script>
  import { Alert, AlertDescription, AlertTitle } from '#lib/components/ui/alert/index.js';
  import { TabsList, TabsPanel, TabsTab } from '#lib/components/ui/tabs/index.js';
  import CodeBlockCommand from '#lib/components/app/code-block-command.svelte';
  import CodeTabs from '#lib/components/app/docs/code-tabs.svelte';
  import ComponentPreview from '#lib/components/app/docs/component-preview.svelte';
  import ComponentSource from '#lib/components/app/docs/component-source.svelte';
  import Step from '#lib/components/app/docs/step.svelte';
  import Steps from '#lib/components/app/docs/steps.svelte';
  import InfoIcon from '@lucide/svelte/icons/info';
</script>
`;

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
const OWN_SCRIPT_RE = /^<script[\s>]/m;
// Fenced code (``` or longer, ~~~ too) can hold `<script>` samples that aren't the document's own.
const FENCE_RE = /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[`~]*[ \t]*$/gm;

/** @param {string} code */
const hasOwnScript = (code) => OWN_SCRIPT_RE.test(code.replace(FENCE_RE, ''));

/** @returns {import('vite').Plugin} */
export function docsComponentImports() {
  return {
    enforce: 'pre',
    name: 'docs-component-imports',
    transform(code, id) {
      // Only the compiled documents: `?raw` and other queried imports keep the source as written.
      if (!id.endsWith('.mdx') || hasOwnScript(code)) return;

      const frontmatter = code.match(FRONTMATTER_RE)?.[0] ?? '';
      return { code: `${frontmatter}${DOCS_SCRIPT}\n${code.slice(frontmatter.length)}`, map: null };
    }
  };
}

/**
 * Collects h2/h3 headings into `plugin_data.toc.items`, with the ids `heading_ids` gives them,
 * mirroring the TOC extraction `docs-toc.svelte` expects.
 */
const toc = {
  name: 'toc',
  parse: {
    heading: {
      // Read on close, once `heading_ids` has given the heading its id.
      parse: (node, ctx) => () => {
        if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) return;
        const id = node.attrs.id;
        const title = node.text_content.trim();
        if (typeof id !== 'string' || !id || !title) return;
        ctx.add('items', { depth: node.depth, title, url: `#${id}` });
      }
    }
  }
};

const THEMES = { dark: 'github-dark-default', light: 'github-light-default' };

// mdsvex 1.0 highlighters are synchronous, so every fence language is loaded up front.
const shiki = await createHighlighter({
  langs: ['bash', 'css', 'diff', 'html', 'javascript', 'json', 'svelte', 'tsx', 'typescript'],
  themes: Object.values(THEMES)
});

/**
 * Build-time only — returns the highlighted `<pre>`; the figure and title around it come from
 * the `pre` replacement in mdx-layout.svelte. mdsvex escapes braces in what this returns itself.
 *
 * @param {string} code
 * @param {{ lang: string, inline: boolean }} info
 */
function highlight(code, { lang, inline }) {
  if (inline) return null;

  try {
    return shiki.codeToHtml(code, { lang: lang || 'text', themes: THEMES });
  } catch {
    return shiki.codeToHtml(code, { lang: 'text', themes: THEMES });
  }
}

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
  extensions: ['.mdx'],
  heading_ids: true,
  highlight,
  plugins: [toc],
  // 0.x curled quotes and made dashes by default; the documents were migrated with that on.
  smart_punctuation: true,
  templates: { default: '#lib/components/app/docs/mdx-layout.svelte' }
};

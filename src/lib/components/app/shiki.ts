// Follows the best practices established in https://shiki.matsu.io/guide/best-performance

import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const bundledLanguages = {
  svelte: () => import('@shikijs/langs/svelte'),
  typescript: () => import('@shikijs/langs/typescript')
};

/** The languages configured for the highlighter (`text` is handled by Shiki without a bundled grammar). */
// export type SupportedLanguage = keyof typeof bundledLanguages | 'text';

/** A preloaded highlighter instance. */
export const highlighter = createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  langs: Object.entries(bundledLanguages).map(([_, lang]) => lang),
  themes: [
    import('@shikijs/themes/github-light-default'),
    import('@shikijs/themes/github-dark-default'),
    import('@shikijs/themes/vesper')
  ]
});

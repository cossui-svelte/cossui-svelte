import DOMPurify from 'dompurify';
import { marked } from 'marked';

marked.use({ async: false });

export function markdownToSafeHTML(markdown: string | null) {
  if (!markdown) return '';
  const parsedMd = marked.parse(markdown) as string;
  return DOMPurify.sanitize(parsedMd);
}

import { marked } from 'marked';
import markedKatexExtension from '../markedKatexExtension';

marked.use(markedKatexExtension());

export function fixMarkdownText(md: string) {
  return md.replace(/^ */gm, '');
}

export function compactHtml(html: string) {
  return html.replace(/\n+\s*/g, '');
}

export function testMarkedOutput(md: string, received: string) {
  const mdClean = fixMarkdownText(md);
  expect(compactHtml(marked.parse(mdClean))).toEqual(compactHtml(received));
}

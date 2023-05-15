import { marked } from 'marked';

export function fixMarkdownText(md: string) {
  return md.replace(/^ */gm, '');
}

export function compactHtml(html: string) {
  return html.replace(/\n+\s*/g, '');
}

export function testMarkedOutput(md: string, received: string) {
  const mdClean = fixMarkdownText(md);
  const output = compactHtml(marked.parse(mdClean));
  const katexTagsRemoved = extractKatexOutput(output);
  const expected = compactHtml(received);
  expect(katexTagsRemoved).toEqual(expected);
}

export function extractKatexOutput(html: string) {
  const regex = /<span((?!<span class="katex").)+<\/span>/g;
  return html.replace(regex, (substring) => {
    return removeHtmlTags(substring);
  });
}

export function removeHtmlTags(html: string) {
  const regex = /<[^>]+>/g;
  return html.replace(regex, '');
}

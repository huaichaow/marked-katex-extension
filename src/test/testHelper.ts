import { marked } from 'marked';

export function removeMarkDownLeadingSpaces(md: string) {
  return md.replace(/^ */gm, '');
}

export function compactHtml(html: string) {
  return html.replace(/\n+\s*/g, ' ').trim();
}

export function testMarkedOutput(md: string, received: string, options?: { inline?: boolean }) {
  const { inline = false } = options || {};
  const mdClean = removeMarkDownLeadingSpaces(md);
  const generatedHtml = marked.parse(mdClean);
  const katexTagsRemoved = extractKatexOutput(generatedHtml, inline);
  const output = compactHtml(katexTagsRemoved);
  const expected = compactHtml(received);
  expect(output).toEqual(expected);
}

export function extractKatexOutput(html: string, inline: boolean) {
  const regex = /<span((?!<span class="katex").)+<\/span>/g;
  return html.replace(regex, (substring) => {
    const dry = removeHtmlTags(substring);
    return inline ? dry : `\n${dry}\n`;
  });
}

export function removeHtmlTags(html: string) {
  const regex = /<[^>]+>/g;
  return html.replace(regex, '');
}

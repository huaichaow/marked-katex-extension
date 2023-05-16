import { marked } from 'marked';
import { testMarkedOutput } from './testHelper';
import markedKatexExtension from '../markedKatexExtension';

marked.use(markedKatexExtension());

describe('marked-toc-extension', () => {
  describe('block level', () => {
    it('should work normally', () => {
      const md = `
      $$
      a = b + c
      $$`;

      const expectedHtml = 'a=b+c';

      testMarkedOutput(md, expectedHtml);
    });

    it('should render multiple katex correctly', () => {
      const md = `
      a simple formula:

      $$
      a = b + c
      $$

      $$
      d = e + f
      $$

      $$
      g = h + i
      $$`;

      const expectedHtml = `
      <p>a simple formula:</p>
      a=b+c
      d=e+f
      g=h+i
    `;

      testMarkedOutput(md, expectedHtml);
    });
  });

  describe('inline level', () => {
    it('should render inline katex', () => {
      const md = `hello $a = b + c$ world`;

      const expectedHtml = '<p>hello a=b+c world</p>';

      testMarkedOutput(md, expectedHtml, { inline: true });
    });

    it('should render multiple inline katex', () => {
      const md = `hello $a = b + c$ $d = e + f$ $g = h + i$ world`;

      const expectedHtml = '<p>hello a=b+c d=e+f g=h+i world</p>';

      testMarkedOutput(md, expectedHtml, { inline: true });
    });
  });
});

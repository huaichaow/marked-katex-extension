import { marked } from 'marked';
import { testMarkedOutput } from './testHelper';
import markedKatexExtension from '../markedKatexExtension';

marked.use(markedKatexExtension());

describe('marked-toc-extension', () => {
  test('should work normally', () => {
    const md = `
      $$
      a = b + c
      $$`;

    const expectedHtml = 'a=b+c';

    testMarkedOutput(md, expectedHtml);
  });

  test('should render multiple katex correctly', () => {
    const md = `
      a simple formula:

      $$
      a = b + c
      $$

      $$
      a = b + c
      $$

      $$
      a = b + c
      $$`;

    const expectedHtml = `
      <p>a simple formula:</p>
      a=b+c
      a=b+c
      a=b+c
    `;

    testMarkedOutput(md, expectedHtml);
  });
});

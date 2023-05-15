import { testMarkedOutput } from './testHelper';

describe('marked-toc-extension', () => {
  test('should work normally without toc', () => {
    const md = `
      a simple formula:

      $$
      a = b + c
      $$`;

    const expectedHtml = `
      <p>a simple formula:</p>
      a = b + c
    `;

    testMarkedOutput(md, expectedHtml);
  });
});

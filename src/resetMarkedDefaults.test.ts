import { marked } from 'marked';
import savedDefaults = marked.defaults;
import { resetMarkedDefaults } from './resetMarkedDefaults';

describe('marked-toc-extension', () => {
  test('should work normally without toc', () => {
    marked.use({
      hooks: {
        preprocess(markdown: string) {
          return markdown;
        }
      },
    });

    expect(marked.defaults).not.toEqual(savedDefaults);

    resetMarkedDefaults();

    expect(marked.defaults).toEqual(savedDefaults);
  });
});

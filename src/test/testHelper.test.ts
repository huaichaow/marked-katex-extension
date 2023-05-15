import { removeHtmlTags } from './testHelper';

function joinLines(text: string, separator = ' ') {
  return text.replace(/\s*\n\s*/g, separator);
}

function mergeSpaces(text: string) {
  return text.replace(/\s+/g, ' ');
}

describe('testHelper', () => {
  describe('removeHtmlTags', () => {
    function testEqual(html: string, expected: string) {
      const htmlWithTagsRemoved = removeHtmlTags(html.trim());
      expect(mergeSpaces(joinLines(htmlWithTagsRemoved))).toEqual(expected);
    }

    it('should remove a single html tags', () => {
      testEqual('<a>link</a>', 'link');
    });

    it('should remove multiple html tags', () => {
      const html = `
        <a>link</a>

        <p>text</p> <img/> img


        <b>bold</b>`;

      testEqual(html, 'link text img bold');
    });
  });
});

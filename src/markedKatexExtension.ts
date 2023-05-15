import { Parser } from 'marked';
import katex from 'katex';

const katexInputRegex = /^(\$\$)\s*\n((((?!\$\$)[^\n])*\n+)*)\1\s*(\n|$)/;

export default function markedKatexExtension() {
  const katexBlockLevelExtension = {
    name: 'katex',
    level: 'block' as const,
    start(src: string) {
      return src.match(/^\$\$/)?.index;
    },
    tokenizer(src: string) {
      const match = katexInputRegex.exec(src);
      if (match) {
        return {
          type: 'katex',
          raw: match[0],
          text: match[2].trim(),
          tokens: [],
        };
      }
    },
    renderer(this: { parser: Parser }, token: { type: string, raw: string, text: string }) {
      return katex.renderToString(token.text, {
        output: 'html',
        throwOnError: false,
      });
    },
  };

  return {
    extensions: [katexBlockLevelExtension],
  };
}

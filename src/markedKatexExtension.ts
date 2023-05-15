import { Parser } from 'marked';

const katexInputRegex = /^(\$\$)\s*\n((((?!\$\$)[^\n])*\n+)*)\1\s*(\n|$)/g;

export default function markedKatexExtension() {
  const katexBlockLevelExtension = {
    name: 'katex',
    level: 'block' as const,
    start(src: string) {
      const x = src.match(/^\$\$/)?.index;
      console.error('start', x);
      return x;
    },
    tokenizer(src: string) {
      const match = katexInputRegex.exec(src);
      if (match) {
        return {
          type: 'katex',
          raw: match[0],
          text: match[2],
          tokens: [],
        };
      }
    },
    renderer(this: { parser: Parser }, token: { type: string, raw: string, text: string }) {
      return token.text;
    }
  };

  return {
    extensions: [katexBlockLevelExtension],
  };
}

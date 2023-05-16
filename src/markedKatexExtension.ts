import { Parser } from 'marked';
import katex from 'katex';

export default function markedKatexExtension() {
  return {
    extensions: [katexBlockExtension(), katexInlineExtension()],
  };
}

function katexBlockExtension() {
  const katexInputRegex = /^(\$\$)\s*\n((((?!\$\$)[^\n])*\n+)*)\1\s*(\n|$)/;

  return {
    name: 'katex-block',
    level: 'block' as const,
    start(src: string) {
      return src.match(/^\$\$/)?.index;
    },
    tokenizer(src: string) {
      const match = katexInputRegex.exec(src);
      if (match) {
        return {
          type: 'katex-block',
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
}

function katexInlineExtension() {
  const katexInlineStartRegex = /\$([^$]+)\$/;
  const katexInlineRegex = new RegExp(`^${katexInlineStartRegex.source}`);

  return {
    name: 'katex-inline',
    level: 'inline' as const,
    start(src: string) {
      return src.match(katexInlineStartRegex)?.index;
    },
    tokenizer(src: string) {
      const match = katexInlineRegex.exec(src);
      if (match) {
        return {
          type: 'katex-inline',
          raw: match[0],
          katex: match[1],
        };
      }
    },
    renderer(this: { parser: Parser }, token: { type: string, raw: string, katex: string }) {
      return katex.renderToString(token.katex, {
        output: 'html',
        throwOnError: false,
      });
    },
    childTokens: ['katex'],
  };
}

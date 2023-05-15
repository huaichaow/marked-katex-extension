# marked-toc-extension

marked Table of Contents Extension.

> Note.
> the heading depth will be automatically fixed.

# usage

```
import { marked } from 'marked';
import tocExtension from 'markdown-toc-extension';
```

## without options

```
marked.use(tocExtension());

marked.parse(`
[TOC]
# a
## b
# c
# d
## e
### f
`);
```
compiled to below(formatted for better readability):
```
<ul class="toc-list">
  <li class="toc-item"><a href="#a">a</a></li>
  <ul class="toc-list">
    <li class="toc-item"><a href="#b">b</a></li>
  </ul>
  <li class="toc-item"><a href="#c">c</a></li>
  <li class="toc-item"><a href="#d">d</a></li>
  <ul class="toc-list">
    <li class="toc-item"><a href="#e">e</a></li>
    <ul class="toc-list">
      <li class="toc-item"><a href="#f">f</a></li>
    </ul>
  </ul>
</ul>
<h1 id="a">a</h1>
<h2 id="b">b</h2>
<h1 id="c">c</h1>
<h1 id="d">d</h1>
<h2 id="e">e</h2>
<h3 id="f">f</h3>
```

## with options

```
marked.use(tocExtension({
  className: 'toc',
  renderChapterNumber: (numbers, kind) => numbers.join(kind === 'toc' ? '-' : '+'),
}));

marked.parse(`
# a
[TOC]
### b
## c
### d
# e
# f
`);
```
compiled to below(formatted for better readability):

> Please note,
> 1. heading `b` level is fixed to h2;
> 2. [TOC] is put under heading `a`, and the output will follow the position;
> 3. the heading numbers are separated with '+' and '-' with custom
  `renderChapterNumber` function.

```
<h1 id="a">1 a</h1>
<ul class="toc-list toc">
  <li class="toc-item"><a href="#a">1 a</a></li>
  <ul class="toc-list">
    <li class="toc-item"><a href="#b">1-1 b</a></li>
    <li class="toc-item"><a href="#c">1-2 c</a></li>
    <ul class="toc-list">
      <li class="toc-item"><a href="#d">1-2-1 d</a></li>
    </ul>
  </ul>
  <li class="toc-item"><a href="#e">2 e</a></li>
  <li class="toc-item"><a href="#f">3 f</a></li>
</ul>
<h2 id="b">1+1 b</h2>
<h2 id="c">1+2 c</h2>
<h3 id="d">1+2+1 d</h3>
<h1 id="e">2 e</h1>
<h1 id="f">3 f</h1>
```

# options

TS definition:

```
export type RenderChapterNumberFn = (numbers: number[], kind: 'toc' | 'heading') => string;

export type MarkedTableOfContentsExtensionOptions = {
  className?: string;
  classNamePrefix?: string;
  renderChapterNumber?: RenderChapterNumberFn | true;
};
```

**className**

`class` attribute value to set to the `Table of contents` root element.

**classNamePrefix**

every `<ul>` and `<li>` in TOC output will be assigned a class name prefixed
with this value, by default the value is `toc-`, could be changed to
anything as long as the result is a valid class name, e.g., `x-`.

* for `<ul>` the class name is `<prefix>list`, e.g., `toc-list`, `x-list`
* for `<li>` the class name is `<prefix>item`, e.g., `toc-item`, `x-item`

**renderChapterNumber**

* \<not provided> - chapter number will not be generated
* `true` - the default format(dot separated numbers) will be used,
  e.g., `1`, `1.2.3`, `2.1`.
* \<a function> with signature
  `(numbers: number[], kind: 'toc' | 'heading') => string;`
  - `numbers` - an array of numbers represents the heading number,
    e.g., `[1]`, `[1,2,3]`, `[2,1]`
  - `kind` - has 2 values `toc` and `heading`, the former indicates to
    render for 'Table of contents' and the later for 'Headings'; it enables
    you to render different styles of chapter numbers for TOC and Headings.

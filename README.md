# @suin/mdast-character-count

[mdast] utility to count characters.

## Installation

```bash
yarn add @suin/mdast-character-count
# or
npm install @suin/mdast-character-count
```

## Usage

```ts
import { countCharacter } from "@suin/mdast-character-count";

const text = markdown`
# 12345

1234567890

- 12345
- 12345

~~~
12345
~~~
`;
const tree = mdastUtilFromMarkdown(text);
const { textCharacters, codeCharacters } = countCharacter(tree);

console.log(textCharacters); //=> 25
console.log(codeCharacters); //=> 5
```

More examples, see [example.test.ts](./example.test.ts).

## API Reference

https://suin.github.io/mdast-character-count/

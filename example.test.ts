import mdastUtilFromMarkdown from "mdast-util-from-markdown";
import { outdent as markdown } from "outdent";
import { countCharacter } from "./index";

test("example", () => {
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
  expect(textCharacters).toBe(25);
  expect(codeCharacters).toBe(5);
});

test("custom character counter", () => {
  const text = markdown`
12345 12345
  `;
  const tree = mdastUtilFromMarkdown(text);

  function countExcludeSpaces(text: string) {
    return text.replace(/\s+/g, "").length;
  }

  const { textCharacters } = countCharacter(tree, {
    countTextCharacters: countExcludeSpaces,
  });
  expect(textCharacters).toBe(10);
});

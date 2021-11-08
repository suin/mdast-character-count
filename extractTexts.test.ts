import { extractTexts } from "./index";
import { markdown as md, ghfMarkdown } from "./testUtil";

function markdown(markdownText: TemplateStringsArray): string[] {
  const tree = md`${markdownText}`;
  return [...extractTexts(tree.children)];
}

describe("paragraph", () => {
  test("paragraph", () => {
    expect(markdown`
paragraph1

paragraph2
    `).toMatchInlineSnapshot(`
      Array [
        paragraph1,
        paragraph2,
      ]
    `);
  });
});

describe("header", () => {
  test("header levels", () => {
    expect(markdown`
# header1

## header2

### header3

#### header4

##### header5

###### header6
    `).toMatchInlineSnapshot(`
          Array [
            header1,
            header2,
            header3,
            header4,
            header5,
            header6,
          ]
      `);
  });

  test("header with code", () => {
    expect(markdown`
# before\`code\`after
    `).toMatchInlineSnapshot(`
          Array [
            before,
            code,
            after,
          ]
      `);
  });

  test("header with emphasis and strong emphasis", () => {
    expect(markdown`
# normal _emphasis_ **strong emphasis**
    `).toMatchInlineSnapshot(`
          Array [
            normal ,
            emphasis,
             ,
            strong emphasis,
          ]
      `);
  });
});

describe("list", () => {
  test("bullet list", () => {
    expect(markdown`
- a
- b
- c
    `).toMatchInlineSnapshot(`
      Array [
        a,
        b,
        c,
      ]
    `);
  });

  test("ordered list", () => {
    expect(markdown`
1. a
2. b
3. c
    `).toMatchInlineSnapshot(`
      Array [
        a,
        b,
        c,
      ]
    `);
  });
});

describe("code", () => {
  test("code", () => {
    expect(markdown`
before code

~~~
code
~~~

after code
    `).toMatchInlineSnapshot(`
      Array [
        before code,
        after code,
      ]
    `);
  });
});

describe("blockquote", () => {
  test("blockquote", () => {
    expect(markdown`
> quote
    `).toMatchInlineSnapshot(`
      Array [
        quote,
      ]
    `);
  });
});

describe("link", () => {
  test("link", () => {
    expect(markdown`
[link](https://example.com)
    `).toMatchInlineSnapshot(`
      Array [
        link,
      ]
    `);
  });

  test("URL", () => {
    expect(markdown`
<https://example.com>
    `).toMatchInlineSnapshot(`
      Array [
        https://example.com,
      ]
    `);
  });
});

describe("image", () => {
  test("image", () => {
    expect(markdown`
![image](https://example.com/test.png)
    `).toMatchInlineSnapshot(`Array []`);
  });
});

describe("table", () => {
  const markdown = ghfMarkdown;
  test("table", () => {
    const x = markdown`
| head1 | head2 | head3 |
| ----- | ----- | ----- |
| 1.1   | 2.1   | 3.1   |
| 2.1   | 2.2   | 3.1   |
    `;
    expect([...extractTexts(x.children)]).toMatchInlineSnapshot(`
      Array [
        head1,
        head2,
        head3,
        1.1,
        2.1,
        3.1,
        2.1,
        2.2,
        3.1,
      ]
    `);
  });
});

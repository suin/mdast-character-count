import { Code, InlineCode, Parent, Root, Text } from "mdast";
import { Node } from "unist";

export function countCharacter(
  root: Root,
  {
    countTextCharacters = (text) => text.length,
    countCodeCharacters = (code) => code.length,
  }: Options = {}
) {
  let textCharacters = 0;
  let codeCharacters = 0;
  for (const text of extractTexts(root.children)) {
    textCharacters += countTextCharacters(text);
  }
  for (const code of extractCodes(root.children)) {
    codeCharacters += countCodeCharacters(code);
  }
  return { textCharacters, codeCharacters };
}

export type Options = {
  countTextCharacters?: (text: string) => number;
  countCodeCharacters?: (code: string) => number;
};

export type Result = {
  readonly textCharacters: number;
  readonly codeCharacters: number;
};

export function* extractTexts(tree: ReadonlyArray<Node>): Iterable<string> {
  for (const node of tree) {
    if (isText(node)) {
      yield node.value;
    }
    if (isInlineCode(node)) {
      yield node.value;
    }
    if (isParent(node)) {
      yield* extractTexts(node.children);
    }
  }
}

export function* extractCodes(tree: ReadonlyArray<Node>): Iterable<string> {
  for (const node of tree) {
    if (isCode(node)) {
      yield node.value;
    }
    if (isParent(node)) {
      yield* extractCodes(node.children);
    }
  }
}

function isParent(
  node: Node & { readonly children?: unknown }
): node is Parent {
  return Array.isArray(node.children);
}

function isText(node: Node): node is Text {
  return node.type === "text";
}

function isInlineCode(node: Node): node is InlineCode {
  return node.type === "inlineCode";
}

function isCode(node: Node): node is Code {
  return node.type === "code";
}

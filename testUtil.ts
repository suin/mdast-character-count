import { Root } from "mdast";
import mdastUtilFromMarkdown from "mdast-util-from-markdown";
import { outdent } from "outdent";
const syntax = require("micromark-extension-gfm");
const gfm = require("mdast-util-gfm");

export function markdown(
  strings: TemplateStringsArray,
  ...values: Array<any>
): Root {
  return mdastUtilFromMarkdown(outdent(strings, ...values));
}

export function ghfMarkdown(
  strings: TemplateStringsArray,
  ...values: Array<any>
): Root {
  return mdastUtilFromMarkdown(outdent(strings, ...values), {
    extensions: [syntax()],
    mdastExtensions: [gfm.fromMarkdown],
  });
}

import fs from "fs";
import h2m from "html-to-md";
import { flow, get, includes } from "lodash";

export const writeToTemp = async (path = "./temp.md") => {
  const getHtml = fs.readFileSync("./demo.html", { encoding: "utf-8" });

  let markdown = h2m(getHtml, {
    tagListener: (tag, props) => {
      const hasLineNumber = includes(get(props, "attrs.class", ""), "linenumber");
      console.log(`yanle - logger: tag: ${tag} - hasLineNumber: ${hasLineNumber}`, props);
      if (hasLineNumber) {
        return {
          ...props,
          match: "",
        };
      }
      return props;
    },
  }, true);

  // 写入文件
  markdown = flow(
    value => value.replace(/javascriptCopy code/gi, ""),
    value => value.replace(/htmlCopy code/gi, ""),
    value => value.replace(/cssCopy code/gi, ""),
    value => value.replace(/jsCopy code/gi, ""),
    value => value.replace(/\\. /gi, ". "),
    value => value.replace(/\\- /gi, "- "),
    value => value.replace(/复制代码/gi, ""),
    // value => value.replace(/\n### /gi, "\n#### "),
    value => value.replace(/\n## /gi, "\n### "),
  )(markdown);

  // if (/javascriptCopy code/gi.test(markdown)) markdown = markdown.replace(/javascriptCopy code/gi, "");

  if (markdown) fs.writeFileSync(path, markdown, { encoding: "utf-8" });

  return;
};


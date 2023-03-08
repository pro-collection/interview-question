import * as fs from "fs";
import * as path from "path";
import { mdToPdf } from "md-to-pdf";

const main = async () => {
  const filePath = path.resolve(__dirname, "../../README.md");
  const outputPath = path.resolve(__dirname, "../../README.pdf");

  const pdf = await mdToPdf({ path: filePath }, { page_media_type: "print" }).catch(console.error);

  if (pdf) fs.writeFileSync(outputPath, pdf.content);
};

main();

export {};

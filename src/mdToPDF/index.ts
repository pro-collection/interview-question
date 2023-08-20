import * as fs from "fs";
import * as path from "path";
import { mdToPdf } from "md-to-pdf";

const main = async () => {
  const filePath = path.resolve(__dirname, "../../books/2023-08-20 更新.md");
  const outputPath = path.resolve(__dirname, "../../books/2023-08-20 更新.pdf");

  const pdf = await mdToPdf({ path: filePath }, { page_media_type: "print" }).catch(console.error);

  if (pdf) fs.writeFileSync(outputPath, pdf.content);

  console.log('yanle - logger: ', filePath);
};

main();

export {};

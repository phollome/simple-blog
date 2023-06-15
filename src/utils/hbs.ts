import fs from "fs-extra";
import Handlebars from "handlebars";

export async function registerPartial(
  hbs: typeof Handlebars,
  options: { partialName: string; filePath: string }
) {
  const partial = await fs.readFile(options.filePath, "utf-8");
  hbs.registerPartial(options.partialName, partial);
}

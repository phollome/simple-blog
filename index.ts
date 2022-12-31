import { readFile } from "fs-extra";
import matter from "gray-matter";
import Handlebars from "handlebars";
import { marked } from "marked";
import { getListOfFilePaths } from "./src/utils";

async function main() {
  const filePathList = await getListOfFilePaths("./data");

  const files: ReturnType<typeof matter.read>[] = [];

  for (const filePath of filePathList) {
    const file = matter.read(filePath);
    console.log(file);
    if (
      file.data.title === undefined ||
      file.data.slug === undefined ||
      file.data.date === undefined
    ) {
      console.error(
        `Can't process ${filePath}. Some missing meta informations.`
      );
    } else {
      file.content = marked(file.content);
      files.push(file);
    }
  }

  const postTemplateFile = await readFile("./templates/post.hbs");
  const postTemplate = await postTemplateFile.toString();
  const compiledPostTemplate = Handlebars.compile(postTemplate);

  for (const file of files) {
    const html = compiledPostTemplate({
      title: file.data.title,
      content: file.content,
    });
    console.log(html);
  }
}

main().finally(() => {
  console.log("\nDone.");
});

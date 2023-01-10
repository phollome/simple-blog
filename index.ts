import { readFile } from "fs-extra";
import matter from "gray-matter";
import Handlebars from "handlebars";
import { marked } from "marked";
import { getListOfFilePaths } from "./src/utils";
import configure from "./blog.config";

async function main() {
  const config = configure();

  const filePathList = await getListOfFilePaths(config.contentPath);

  const files: ReturnType<typeof matter.read>[] = [];

  for (const filePath of filePathList) {
    const file = matter.read(filePath, { excerpt: true });
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
      description: file.data.description,
      author: config.author,
    });
    console.log(html);
  }
}

main().finally(() => {
  console.log("\nDone.");
});

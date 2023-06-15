import { outputFile, readFile, emptyDir } from "fs-extra";
import matter from "gray-matter";
import Handlebars from "handlebars";
import { marked } from "marked";
import configure from "./blog.config";
import { getFilePaths } from "./src/fs-utils";
import chokidar from "chokidar";

const config = configure();

async function main() {
  const { author, title, description } = config;

  await emptyDir("./build");

  const filePathList = await getFilePaths(config.contentPath);

  const files: ReturnType<typeof matter.read>[] = [];

  for (const filePath of filePathList) {
    const file = matter.read(filePath, { excerpt: true });
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

  const posts = [];

  for (const file of files) {
    const postTitle = file.data.title;

    const postHtml = compiledPostTemplate({
      title: postTitle,
      content: file.content,
      description: file.data.description,
      author,
    });

    const year = file.data.date.getFullYear();
    const month = file.data.date.getMonth() + 1;

    const postLink = `${year}/${month}/${file.data.slug}.html`;

    await outputFile(`./build/${postLink}`, postHtml);

    posts.push({ title: postTitle, link: postLink });
  }

  const homeTemplateFile = await readFile("./templates/home.hbs");
  const homeTemplate = await homeTemplateFile.toString();
  const compiledHomeTemplate = Handlebars.compile(homeTemplate);

  const html = compiledHomeTemplate({
    title,
    description,
    author,
    posts,
  });

  await outputFile(`./build/index.html`, html);
}

if (process.argv.includes("-w") || process.argv.includes("--watch")) {
  console.clear();
  console.log("Running watch mode.");
  chokidar.watch(config.contentPath).on("change", () => {
    console.time("Compiling content");
    main().finally(() => {
      console.timeEnd("Compiling content");
    });
  });
} else {
  main().finally(() => {
    console.log("\nDone.");
  });
}

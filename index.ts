import matter from "gray-matter";
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
      files.push(file);
    }
  }
  console.log(files);
}

main().finally(() => {
  console.log("done.");
});

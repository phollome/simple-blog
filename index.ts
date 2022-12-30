import { getFiles } from "./src/utils";

async function main() {
  const files = await getFiles("./data");
  console.log(files);
}

main().finally(() => {
  console.log("done.");
});

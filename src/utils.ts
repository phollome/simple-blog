import fs from "fs-extra";

export async function getFiles(path: string) {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...(await getFiles(`${path}/${entry.name}`)));
    } else if (entry.name.endsWith(".md")) {
      files.push(`${path}/${entry.name}`);
    }
  }

  return files;
}

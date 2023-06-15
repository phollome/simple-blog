import fs from "fs-extra";
import path from "path";

export async function getFilePaths(root: string) {
  const entries = await fs.readdir(root, { withFileTypes: true });

  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...(await getFilePaths(`${root}/${entry.name}`)));
    } else if (entry.name.endsWith(".md")) {
      files.push(`${root}/${entry.name}`);
    }
  }

  return files;
}

export async function getFileInfo(filePath: string) {
  const stats = await fs.stat(filePath);
  const filename = path.basename(filePath);
  const extension = path.extname(filePath);
  return {
    createdAt: stats.birthtime,
    updatedAt: stats.mtime,
    filename,
    extension,
  };
}

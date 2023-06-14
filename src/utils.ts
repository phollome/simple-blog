import fs from "fs-extra";

export async function getListOfFilePaths(path: string) {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...(await getListOfFilePaths(`${path}/${entry.name}`)));
    } else if (entry.name.endsWith(".md")) {
      files.push(`${path}/${entry.name}`);
    }
  }

  return files;
}

export async function getStatsOfFile(filePath: string) {
  const stats = await fs.stat(filePath);
  return {
    createdAt: stats.birthtime,
    updatedAt: stats.mtime,
  };
}

import fs from "fs-extra";
import path from "path";

export async function getFilePaths(
  root: string,
  options?: { ignoreExtensions?: string[] }
) {
  const entries = await fs.readdir(root, { withFileTypes: true });

  const files: string[] = [];
  for (const entry of entries) {
    const filePath = `${root}/${entry.name}`;

    if (entry.isDirectory()) {
      files.push(...(await getFilePaths(filePath, options)));
    } else {
      if (options !== undefined && options.ignoreExtensions !== undefined) {
        const ignore = options.ignoreExtensions.some((ext) => {
          return entry.name.endsWith(ext);
        });
        if (!ignore) {
          files.push(filePath);
        }
      } else {
        files.push(filePath);
      }
    }
  }

  return files;
}

export function getFilenameInfo(filePath: string) {
  const filename = path.basename(filePath);
  const extension = path.extname(filePath);
  const filenameWithoutExtension = path.basename(filePath, extension);
  return {
    filename,
    extension,
    filenameWithoutExtension,
  };
}

export async function getFileInfo(filePath: string) {
  const stats = await fs.stat(filePath);
  return {
    createdAt: stats.birthtime,
    updatedAt: stats.mtime,
    ...getFilenameInfo(filePath),
  };
}

export async function loadFile(filePath: string) {
  const fileInfo = await getFileInfo(filePath);
  const content = await fs.readFile(filePath, "utf-8");

  return {
    content,
    ...fileInfo,
  };
}

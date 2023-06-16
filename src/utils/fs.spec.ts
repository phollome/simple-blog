import { test, expect } from "vitest";
import { getFilePaths, getFileInfo, getFilenameInfo } from "./fs";
import fs from "fs-extra";

test("getFilePaths()", async () => {
  const files = await getFilePaths("./tmp");

  expect(files).toEqual([
    "./tmp/files/more-files/another-markdown-file.md",
    "./tmp/files/some-markdown-file.md",
    "./tmp/no-mds/some-text-file.txt",
  ]);
});

test("getFilePaths() + ignore extensions", async () => {
  const files = await getFilePaths("./tmp", { ignoreExtensions: [".txt"] });

  expect(files).toEqual([
    "./tmp/files/more-files/another-markdown-file.md",
    "./tmp/files/some-markdown-file.md",
  ]);
});

test("getFilenameInfo()", () => {
  const testFilePath = "./tmp/get-stats-of-file.txt";

  const info = getFilenameInfo(testFilePath);

  expect(info.filename).toBe("get-stats-of-file.txt");
  expect(info.filenameWithoutExtension).toBe("get-stats-of-file");
  expect(info.extension).toBe(".txt");
});

test("getFileInfo()", async () => {
  const testFilePath = "./tmp/get-stats-of-file.txt";

  await fs.ensureFile(testFilePath);

  const info = await getFileInfo(testFilePath);

  expect(info.createdAt).toBeInstanceOf(Date);
  expect(info.updatedAt).toBeInstanceOf(Date);
  expect(info.filename).toBe("get-stats-of-file.txt");
  expect(info.filenameWithoutExtension).toBe("get-stats-of-file");
  expect(info.extension).toBe(".txt");

  await fs.remove(testFilePath);
});

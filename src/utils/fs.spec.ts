import { test, expect } from "vitest";
import { getFilePaths, getFileInfo } from "./fs";
import fs from "fs-extra";

test("getListOfFilePaths()", async () => {
  const files = await getFilePaths("./tmp");

  expect(files).toEqual([
    "./tmp/files/more-files/another-markdown-file.md",
    "./tmp/files/some-markdown-file.md",
  ]);
});

test("getStatsOfFile()", async () => {
  const testFilePath = "./tmp/get-stats-of-file.txt";

  await fs.ensureFile(testFilePath);

  const info = await getFileInfo(testFilePath);

  expect(info.createdAt).toBeInstanceOf(Date);
  expect(info.updatedAt).toBeInstanceOf(Date);
  expect(info.filename).toBe("get-stats-of-file.txt");
  expect(info.extension).toBe(".txt");

  await fs.remove(testFilePath);
});

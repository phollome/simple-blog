import { test, expect } from "vitest";
import { getListOfFilePaths, getStatsOfFile } from "./utils";
import fs from "fs-extra";

test("getListOfFilePaths()", async () => {
  const files = await getListOfFilePaths("./tmp");

  expect(files).toEqual([
    "./tmp/files/more-files/another-markdown-file.md",
    "./tmp/files/some-markdown-file.md",
  ]);
});

test("getStatsOfFile()", async () => {
  const testFilePath = "./tmp/get-stats-of-file.txt";

  await fs.ensureFile(testFilePath);

  const stats = await getStatsOfFile("./tmp/files/some-markdown-file.md");

  expect(stats.createdAt).toBeInstanceOf(Date);
  expect(stats.updatedAt).toBeInstanceOf(Date);

  await fs.remove(testFilePath);
});

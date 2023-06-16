import { test, expect } from "vitest";
import { getFilePaths, getFileInfo, getFilenameInfo, loadFile } from "./fs";
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
  const testFilePath = "./tmp/get-filename-info.txt";

  const info = getFilenameInfo(testFilePath);

  expect(info.filename).toBe("get-filename-info.txt");
  expect(info.filenameWithoutExtension).toBe("get-filename-info");
  expect(info.extension).toBe(".txt");
});

test("getFileInfo()", async () => {
  const testFilePath = "./tmp/get-file-info.txt";

  await fs.ensureFile(testFilePath);

  const info = await getFileInfo(testFilePath);

  expect(info.createdAt).toBeInstanceOf(Date);
  expect(info.updatedAt).toBeInstanceOf(Date);
  expect(info.filename).toBe("get-file-info.txt");
  expect(info.filenameWithoutExtension).toBe("get-file-info");
  expect(info.extension).toBe(".txt");

  await fs.remove(testFilePath);
});

test("loadFile()", async () => {
  const filePath = "./tmp/load-file.txt";
  await fs.outputFile(filePath, "This is a test content.");

  const itemData = await loadFile(filePath);

  expect(itemData.filename).toBe("load-file.txt");
  expect(itemData.filenameWithoutExtension).toBe("load-file");
  expect(itemData.extension).toBe(".txt");
  expect(itemData.content).toBe("This is a test content.");
  expect(itemData.createdAt).toBeInstanceOf(Date);
  expect(itemData.updatedAt).toBeInstanceOf(Date);
});

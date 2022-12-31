import { test, expect } from "vitest";
import { getListOfFilePaths } from "./utils";

test("getListOfFilePaths()", async () => {
  const files = await getListOfFilePaths("./tmp");

  expect(files).toEqual([
    "./tmp/files/more-files/another-markdown-file.md",
    "./tmp/files/some-markdown-file.md",
  ]);
});

import { test, expect } from "vitest";
import { getFiles } from "./utils";

test("getFiles", async () => {
  const files = await getFiles("./tmp");

  expect(files).toEqual([
    "./tmp/files/more-files/another-markdown-file.md",
    "./tmp/files/some-markdown-file.md",
  ]);
});

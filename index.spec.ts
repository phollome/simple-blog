import { deleteAsync } from "del";
import { afterAll, beforeAll, expect, test } from "vitest";
import fs from "fs-extra";
import { spawn, exec } from "node:child_process";

beforeAll(async () => {
  // ./tmp/
  // - files/
  //   - some-markdown-file.md
  //   - more-files
  //     - another-markdown-file.md
  // - empty/
  // - no-mds/
  //   - some-file.txt
  await fs.ensureFile("./tmp/files/some-markdown-file.md");
  await fs.ensureFile("./tmp/files/more-files/another-markdown-file.md");
  await fs.ensureDir("./tmp/empty");
  await fs.ensureFile("./tmp/no-mds/some-text-file.txt");

  exec("npm run build");
});

test("get files", () => {
  return new Promise((resolve) => {
    const script = spawn("npm", ["start"]);

    script.stdout.on("data", (data) => {
      console.log("hello");
      console.log(data.toString());
    });
    script.stderr.on("data", (data) => {
      console.log("hello");
      console.error(data.toString());
    });
    script.on("close", (code) => {
      expect(code).toBe(0);
      resolve(null);
    });
  });
});

afterAll(async () => {
  await deleteAsync("./tmp/");
});

import fs from "fs-extra";
import { exec, spawn } from "node:child_process";
import { afterAll, beforeAll, expect, test } from "vitest";

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

afterAll(async () => {
  await fs.remove("./tmp/");
});

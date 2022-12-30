import { spawn } from "node:child_process";
import { expect, test } from "vitest";

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

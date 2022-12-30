import { expect, test } from "vitest";
import { hello } from "./utils";

test("hello world", () => {
  const message = hello("world");
  expect(message).toBe("Hello world!");
});

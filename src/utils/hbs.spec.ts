import Handlebars from "handlebars";
import { expect, test } from "vitest";
import { registerPartial } from "./hbs";
import fs from "fs-extra";

test("registerPartial()", async () => {
  const hbs = Handlebars.create();

  const partialName = "test-partial";
  const filePath = "./tmp/test-partial.hbs";
  const partial = "This is a test partial.";

  await fs.writeFile(filePath, partial, "utf-8");

  await registerPartial(hbs, { partialName, filePath });

  expect(hbs.partials[partialName]).toBe(partial);

  await fs.remove(filePath);
});

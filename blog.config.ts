import { author } from "./package.json";

export default function configure() {
  return {
    author: author.name,
    contentPath: "./data",
  };
}

import SearchParser from "../src/index";
import { test_case_data } from "./data";

const parser = new SearchParser("it");

describe("Test stringify method", () => {
  it.each(test_case_data)("should stringify %s", (input: any, output) => {
    expect(parser.stringify(input)).toBe(output);
  });
});

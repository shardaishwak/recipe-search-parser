import SearchParser from "../src/index";
import { normal_test_data, test_case_data } from "./data";

const parser = new SearchParser("it");

describe("Test parse method", () => {
  it.each(test_case_data)(
    "should parse with stringify data %s",
    (output: any, input: any) => {
      expect(parser.parse(input).toString()).toBe(output.toString());
    }
  );
  it.each(normal_test_data)(
    "should parse data with natural text: %s",
    (input: any, output: any) => {
      console.log(input, output);
      const parsed = parser.parse(input);
      expect(parsed.query).toBe(output.query);
      expect(parsed.category).toBe(output.category);
      expect(parsed.include.toString()).toEqual(output.include.toString());
      expect(parsed.exclude.toString()).toEqual(output.exclude.toString());
    }
  );
});

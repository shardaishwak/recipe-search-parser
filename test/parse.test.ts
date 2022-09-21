import SearchParser from "../src/index";
import { SupportedLanguage } from "../src/lang";
import { normal_test_data_EN, normal_test_data_IT, test_case_data_EN, test_case_data_IT } from "./data";


describe("Test parse method - Italian", () => {
  const parser = new SearchParser(SupportedLanguage.it);

  it.each(test_case_data_IT)(
    "should parse with stringify data %s",
    (output: any, input: any) => {
      expect(parser.parse(input).toString()).toBe(output.toString());
    }
  );
  it.each(normal_test_data_IT)(
    "should parse data with natural text: %s",
    (input: any, output: any) => {
      const parsed = parser.parse(input);
      expect(parsed.query).toBe(output.query);
      expect(parsed.category).toBe(output.category);
      expect(parsed.include.toString()).toEqual(output.include.toString());
      expect(parsed.exclude.toString()).toEqual(output.exclude.toString());
    }
  );
});

describe("Test parse method - English", () => {
  const parser = new SearchParser(SupportedLanguage.en);

  it.each(test_case_data_EN)(
    "should parse with stringify data %s",
    (output: any, input: any) => {
      expect(parser.parse(input).toString()).toBe(output.toString());
    }
  );
  it.each(normal_test_data_EN)(
    "should parse data with natural text: %s",
    (input: any, output: any) => {
      const parsed = parser.parse(input);
      expect(parsed.query).toBe(output.query);
      expect(parsed.category).toBe(output.category);
      expect(parsed.include.toString()).toEqual(output.include.toString());
      expect(parsed.exclude.toString()).toEqual(output.exclude.toString());
    }
  );
})

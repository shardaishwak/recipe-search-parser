import SearchParser from "../src/index";
import { SupportedLanguage } from "../src/lang";
import { normal_test_data_EN, normal_test_data_IT, test_case_data_EN, test_case_data_IT } from "./data";

//@ts-ignore
describe("Test parse method - Italian", () => {
  const parser = new SearchParser(SupportedLanguage.it);

  const data = test_case_data_IT as any;
  it.each(data )(
    "should parse with stringify data %s",
    // @ts-ignore
    (output, input) => {
      expect(parser.parse(input).toString()).toBe(output.toString());
    }
  );
  it.each(normal_test_data_IT)(
    "should parse data with natural text: %s",
     // @ts-ignore
    (input: any, output: any) => {
      const parsed = parser.parse(input);
      expect(parsed.query).toBe(output.query);
      expect(parsed.category).toBe(output.category);
      expect(parsed.include.toString()).toEqual(output.include.toString());
      expect(parsed.exclude.toString()).toEqual(output.exclude.toString());
      parsed?.order && expect(parsed.order).toEqual(output.order);
      parsed?.simplecooking && expect(parsed.simplecooking).toEqual(output.simplecooking);
      parsed?.tags && output?.tags&& expect(parsed.tags?.toString()).toEqual(output?.tags?.toString());
    }
  );
});

describe("Test parse method - English", () => {
  const parser = new SearchParser(SupportedLanguage.en);

  it.each(test_case_data_EN)(
    "should parse with stringify data %s",
     // @ts-ignore
    (output: any, input: any) => {
      expect(parser.parse(input).toString()).toBe(output.toString());
    }
  );
  it.each(normal_test_data_EN)(
    "should parse data with natural text: %s",
     // @ts-ignore
    (input: any, output: any) => {
      const parsed = parser.parse(input);
      expect(parsed.query).toBe(output.query);
      expect(parsed.category).toBe(output.category);
      expect(parsed.include.toString()).toEqual(output.include.toString());
      expect(parsed.exclude.toString()).toEqual(output.exclude.toString());
      parsed?.order && expect(parsed.order).toEqual(output.order);
      parsed?.simplecooking && expect(parsed.simplecooking).toEqual(output.simplecooking);
      parsed?.tags && output?.tags && expect(parsed.tags?.toString()).toEqual(output.tags?.toString());
    }
  );
})

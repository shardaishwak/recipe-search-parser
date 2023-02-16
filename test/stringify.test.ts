import SearchParser from "../src/index";
import { SupportedLanguage } from "../src/lang";
import { test_case_data_EN, test_case_data_IT } from "./data";


describe("Test stringify method - English", () => {
  const parser = new SearchParser(SupportedLanguage.en);

  it.each(test_case_data_EN)("EN: should stringify %s", (input: any, output: any) => {
  expect(parser.stringify(input)).toBe(output); 
  })
});

describe("Test strngify method - Italian", () => {
  const parser = new SearchParser(SupportedLanguage.it);

   // @ts-ignore
  it.each(test_case_data_IT)("%s", (input: any, output) => {
    expect(parser.stringify(input)).toBe(output);
  });
})




"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const data_1 = require("./data");
const parser = new index_1.default("it");
describe("Test parse method", () => {
    it.each(data_1.test_case_data)("should parse with stringify data %s", (output, input) => {
        expect(parser.parse(input).toString()).toBe(output.toString());
    });
    it.each(data_1.normal_test_data)("should parse data with natural text: %s", (input, output) => {
        const parsed = parser.parse(input);
        expect(parsed.query).toBe(output.query);
        expect(parsed.category).toBe(output.category);
        expect(parsed.include.toString()).toEqual(output.include.toString());
        expect(parsed.exclude.toString()).toEqual(output.exclude.toString());
    });
});

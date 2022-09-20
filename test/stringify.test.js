"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const data_1 = require("./data");
const parser = new index_1.default("it");
describe("Test stringify method", () => {
    it.each(data_1.test_case_data)("should stringify %s", (input, output) => {
        expect(parser.stringify(input)).toBe(output);
    });
});

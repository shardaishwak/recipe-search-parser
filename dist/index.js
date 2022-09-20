"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const it_1 = require("./lang/it");
class SearchParser {
    constructor(lang) {
        this.stringify = (query, category, include, exclude) => {
            let path = "";
            if (query) {
                // sanitize
                // Remove ricetta, any punctuation and replace space with -
                const removeSpace = query
                    .replace(/ricetta /g, "")
                    .replace(/, |,| ,|  /g, " ")
                    .replace(/ /g, "-");
                path += removeSpace;
            }
            if (category) {
                const text = "categoria-" + category;
                if (path) {
                    path += "-";
                }
                path += text;
            }
            if (include && include.length > 0) {
                const text = "con-" + include.join("-");
                if (path) {
                    path += "-";
                }
                path += text;
            }
            if (exclude && exclude.length > 0) {
                const text = "senza-" + exclude.join("-");
                if (path) {
                    path += "-";
                }
                path += text;
            }
            return path;
        };
        this.parse = (path) => {
            var _a;
            const sanitize = path.replace(/ /g, "-");
            // Get string between ricetta- and categoria- or only ricetta- if no categoria
            const queryRegex = /(?=ricetta-)(.*)(?=-categoria)|(?=ricetta-)(.*)(?=-con)|(?=ricetta-)(.*)(?=-senza)|(?=ricetta-)(.*)/g;
            // Get string between categoria- and con- or only categoria- if no con
            const categoryRegex = this._getRegexForStringSearch("categoria", [
                "con",
                "senza",
                "ricetta",
            ]);
            // Get string between con- and senza- or only con- if no senza
            const includeRegex = this._getRegexForStringSearch("con", [
                "senza",
                "categoria",
            ]);
            // Get string after senza-
            const excludeRegex = this._getRegexForStringSearch("senza", [
                "con",
                "categoria",
            ]);
            // Getting the specific text for include from array of elements that were fould
            // This is required for filtering the path and get the query
            const includePath = this._regexTextToArray(includeRegex, sanitize)
                .map((e) => "con-" + e)
                .join("|");
            // Getting the specific text for exclude-> senza-{ingredients}
            const excludePath = this._regexTextToArray(excludeRegex, sanitize)
                .map((e) => "senza-" + e)
                .join("|");
            // Getting the specific text for category-> categoria-{category}
            const categoryText = (_a = sanitize.match(categoryRegex)) === null || _a === void 0 ? void 0 : _a[0];
            // Finding the query by prior -> the only text remaining is the query
            const queryText = sanitize
                .replace(new RegExp(`ricetta-${categoryText
                ? `|categoria-${categoryText}|-categoria-${categoryText}`
                : ""}${includePath ? `|-${includePath}|${includePath}` : ""}${excludePath ? `|${excludePath}|-${excludePath}` : ""}`, "g"), "")
                .replace(/-/g, " ");
            // Splitting the ingredients and removing the words to exclude
            const includeText = this._regexTextToIngredientsArray(includeRegex, sanitize);
            // Splitting the ingredients and removing the words to exclude
            const excludeText = this._regexTextToIngredientsArray(excludeRegex, sanitize);
            return {
                query: queryText || "",
                category: categoryText || "",
                include: includeText || [],
                exclude: excludeText || [],
            };
        };
        this._getRegexForStringSearch = (keyword, between) => {
            let betweenRegex = between
                ? `(?=-${keyword}|${between.map((e) => `-${e}`).join("|")})`
                : "";
            return new RegExp(`(?<=${keyword}-)(.*?)${betweenRegex}|(?<=${keyword}-)(.*)`, "g");
        };
        this._regexTextToArray = (regex, text) => {
            const match = text.match(regex);
            const arr = [];
            match === null || match === void 0 ? void 0 : match.forEach((element) => {
                arr.push(element);
            });
            return arr;
        };
        this._regexTextToIngredientsArray = (regex, text) => {
            const match = text.match(regex);
            const ingredients = new Set();
            match === null || match === void 0 ? void 0 : match.forEach((result) => {
                result.split("-").forEach((element) => {
                    !it_1.wordsToExclude.includes(element) && ingredients.add(element);
                });
            });
            return [...ingredients];
        };
        this.lang = lang;
    }
}
exports.default = SearchParser;

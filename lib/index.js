"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const it_1 = require("./lang/it");
/**
 * @param {string} text
 *
 * Search Parser allows you to parse a text and extract the query, category, include and exclude words.
 *
 * stringify: format the the data that was given into brower friendly URL path
 *      - query: the query string
 *      - category: the category of the recipe
 *      - include: the words that must be included in the recipe
 *      - exclude: the words that must be excluded in the recipe
 *      Example: query = "ricetta di banana", category = "dolci", include = ["latte"], exclude = ["uova"]
 *      - stringify() => "ricetta-di-banana-categoria-dolci-con-latte-senza-uova"
 *
 * Space complexity: O(1)
 * Time complexity: O(n)
 *
 * Parse: parse the URL and extract the query, category, include and exclude words. It enables the conversion of the natural text into a machine readable format.
 *      URL: any text that the user has writtes
 *      Any extra spacing, dashes, comma will be automatically removes
 *      Example: "ricetta alla banana con mozarella e tartufo senza uova"
 *      - parse() => { query: "alla banana", category: "", include: ["mozarella", "tartufo"], exclude: ["uova"] }
 *
 * Space complexity: O(1)
 * Time complexity: O(n)
 *
 */
class SearchParser {
    constructor(lang) {
        /**
         *  Format: {query}-categoria-{string}-con-[string]-senza-[string]
         *  Example: pasta-al-forno-categoria-primo-con-olio-senza-uova
         *
         * @param {query: string, category?: string, include?: Array<string>, exclude?: Array<string>} data
         * @returns string
         */
        this.stringify = (data) => {
            const { query, category, include, exclude } = data;
            let path = "";
            // Checking if the query was provided
            if (query) {
                // sanitize
                // Removing commas and replacing spaces with dashes
                const removeSpace = query.replace(/, |,| ,|  /g, " ").replace(/ /g, "-");
                // Adding to the pat
                path += removeSpace;
            }
            // Check if the category was provided
            if (category) {
                // Adding the index
                const text = "categoria-" + category;
                // Adding to the path and dash if the query was provided
                if (path) {
                    path += "-";
                }
                path += text;
            }
            // Check if the include was provided
            if (include && include.length > 0) {
                // Formatting the ingredinets by joining with dash
                const text = "con-" + include.join("-");
                // Checking if the query or category was provided
                if (path) {
                    path += "-";
                }
                // Adding to path
                path += text;
            }
            // Check if the exclude was provided
            if (exclude && exclude.length > 0) {
                // Formatting the ingredinets by joining with dash
                const text = "senza-" + exclude.join("-");
                // Checking if the query, category or include was provided
                if (path) {
                    path += "-";
                }
                // Adding to path
                path += text;
            }
            return path;
        };
        /**
         * @param path: string
         * @return { query: string, category: string, include: Array<string>, exclude: Array<string> }
         */
        this.parse = (path) => {
            var _a;
            // The user didn't type anything
            if (it_1.searchIndexes.includes(path) || path.trim() === "") {
                return {
                    query: "",
                    category: "",
                    include: [],
                    exclude: [],
                };
            }
            //Removing th white space and adding dashes + replacing the coma with a space
            const sanitize = path.replace(/ /g, "-").replace(/, | , | ,|,|/g, "");
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
                .replace(/-/g, " ")
                .replace(new RegExp(`^(${it_1.wordsToExcludeString})`), "") // Remove the first word if it's in the list of words to exclude
                .trim();
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
        // Formatting the regex for the specific index
        // Eg. ricetta:  /(?=ricetta-)(.*)(?=-categoria)|(?=ricetta-)(.*)(?=-con)|(?=ricetta-)(.*)(?=-senza)|(?=ricetta-)(.*)/g;
        /**
         *
         * @param keyword
         * @param between indexes that will be of boundry. For instance, category, con, senza-> the indexes between which the data should be
         * @returns RegExp
         */
        this._getRegexForStringSearch = (keyword, between) => {
            let betweenRegex = between
                ? `(?=-${keyword}|${between.map((e) => `-${e}`).join("|")})`
                : "";
            return new RegExp(`(?<=${keyword}-)(.*?)${betweenRegex}|(?<=${keyword}-)(.*)`, "g");
        };
        // Matches the regex to a given string and extracts the strings that matches the format
        // Required for extrating the query: the query will be givem by the string - the various index matches
        /**
         *
         * example: con panna, con mozzarella, senza crosta, con torta
         * return: ["panna", "mozzarella", "torta"]
         *
         * @param regex
         * @param text
         * @returns Array<string>
         */
        this._regexTextToArray = (regex, text) => {
            const match = text.match(regex);
            const arr = [];
            match === null || match === void 0 ? void 0 : match.forEach((element) => {
                arr.push(element);
            });
            return arr;
        };
        // Quite same as _regexTextToArray, but instead of extracting string only, it extracts the ingredients
        /**
         *
         * @param regex
         * @param text
         * @returns Array<string> (ingredients)
         */
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
//# sourceMappingURL=index.js.map
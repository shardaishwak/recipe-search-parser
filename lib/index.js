"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = __importDefault(require("./lang"));
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
            const searchIndexes = lang_1.default[this.lang].searchIndexesDict;
            let path = "";
            // Catgory will be added ad the beginning of the URL - always
            if (category) {
                path += this._cleanStringRegexp(category, true).replace(/ /g, "-");
            }
            // Checking if the query was provided
            if (query) {
                // sanitize
                // Removing commas and replacing spaces with dashes
                const removeSpace = this._cleanStringRegexp(query, true).replace(/ /g, "-");
                // Adding to the path
                if (path) {
                    path += "-";
                }
                path += removeSpace;
            }
            // Check if the include was provided
            if (include && include.length > 0) {
                // Formatting the ingredinets by joining with dash
                const removeSpaceAndConcat = this._cleanStringRegexp(include.join("-"), true).replace(/ /g, "-");
                const text = searchIndexes.with + "-" + removeSpaceAndConcat;
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
                const removeSpaceAndConcat = this._cleanStringRegexp(exclude.join("-"), true).replace(/ /g, "-");
                const text = searchIndexes.without + "-" + removeSpaceAndConcat;
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
            const text = lang_1.default[this.lang].searchIndexesDict;
            const categories = lang_1.default[this.lang].categories;
            const categoriesSingularToPlural = lang_1.default[this.lang].categoriesSingularToPlural;
            // The user didn't type anything
            if (lang_1.default[this.lang].searchIndexes.includes(path) || path.trim() === "") {
                return {
                    query: "",
                    category: "",
                    include: [],
                    exclude: [],
                };
            }
            //Removing th white space and adding dashes + replacing the coma with a space
            const sanitize = this._cleanStringRegexp(path, true).replace(/ /g, "-");
            // Get string between ricetta- and categoria- or only ricetta- if no categoria
            const queryRegex = /(?=ricetta-)(.*)(?=-categoria)|(?=ricetta-)(.*)(?=-con)|(?=ricetta-)(.*)(?=-senza)|(?=ricetta-)(.*)/g;
            // Get string between categoria- and con- or only categoria- if no con
            const categoryRegex = new RegExp(`^(${categories.join("|")})`, "g");
            // Get string between con- and senza- or only con- if no senza
            const includeRegex = this._getRegexForStringSearch(text.with, [
                text.without,
                text.category,
            ]);
            // Get string after senza-
            const excludeRegex = this._getRegexForStringSearch(text.without, [
                text.with,
                text.category,
            ]);
            // Getting the specific text for include from array of elements that were fould
            // This is required for filtering the path and get the query
            const includePath = this._regexTextToArray(includeRegex, sanitize)
                .map((e) => text.with + "-" + e)
                .join("|");
            // Getting the specific text for exclude-> senza-{ingredients}
            const excludePath = this._regexTextToArray(excludeRegex, sanitize)
                .map((e) => text.without + "-" + e)
                .join("|");
            // Getting the specific text for category-> categoria-{category}
            const categoryText = (_a = sanitize.match(categoryRegex)) === null || _a === void 0 ? void 0 : _a[0];
            // Finding the query by prior -> the only text remaining is the query
            const queryText = sanitize
                .replace(new RegExp(`${categoryText}-|${categoryText}|${text.recipe}-${includePath ? `|-${includePath}|${includePath}` : ""}${excludePath ? `|${excludePath}|-${excludePath}` : ""}`, "g"), "")
                .replace(/-/g, " ")
                .replace(new RegExp(`${lang_1.default[this.lang].wordsToExcludeString}`), "") // Remove the first word if it's in the list of words to exclude
                .trim();
            // Splitting the ingredients and removing the words to exclude
            const includeText = this._regexTextToIngredientsArray(includeRegex, sanitize);
            // Splitting the ingredients and removing the words to exclude
            const excludeText = this._regexTextToIngredientsArray(excludeRegex, sanitize);
            return {
                query: queryText || "",
                category: categoryText && (categoriesSingularToPlural[categoryText] || categoryText) || "",
                include: includeText || [],
                exclude: excludeText || [],
            };
        };
        // Formatting the regex for the specific index
        // Eg. recipe:  /(?=recipe-)(.*)(?=-categpry)|(?=recipe-)(.*)(?=-with)|(?=recipe-)(.*)(?=-without)|(?=recipe-)(.*)/g;
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
         * return: ["panna", "mozzarella", "cake"]
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
                    !lang_1.default[this.lang].wordsToExclude.includes(element) && ingredients.add(element);
                });
            });
            return [...ingredients];
        };
        /**
         * Clean the string the user wrote: should contain only letters, numbers, or spaces
         * Ex. torta con carote, cipolla. Ma senza panna (e yogurt) -> torta con carote cipolla ma senza panna e yogurt
         */
        this._cleanStringRegexp = (string, withSpace) => {
            const regex = new RegExp(`[^a-z${withSpace ? " " : ""}A-Z0-9]`, "g");
            const space = withSpace ? " " : "";
            return string.toLowerCase().replace(regex, space).replace(/\s+/g, space).trim();
        };
        this.lang = lang;
    }
}
exports.default = SearchParser;
//# sourceMappingURL=index.js.map
import { SupportedLanguage } from "./lang";
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
declare class SearchParser {
    lang: SupportedLanguage;
    constructor(lang: SupportedLanguage);
    /**
     *  Format: {query}-categoria-{string}-con-[string]-senza-[string]
     *  Example: pasta-al-forno-categoria-primo-con-olio-senza-uova
     *
     * @param {query: string, category?: string, include?: Array<string>, exclude?: Array<string>} data
     * @returns string
     */
    stringify: (data: {
        query?: string;
        category?: string;
        include?: Array<string>;
        exclude?: Array<string>;
    }) => string;
    /**
     * @param path: string
     * @return { query: string, category: string, include: Array<string>, exclude: Array<string> }
     */
    parse: (path: string) => {
        query: string;
        category: any;
        include: string[];
        exclude: string[];
    };
    /**
     *
     * @param keyword
     * @param between indexes that will be of boundry. For instance, category, con, senza-> the indexes between which the data should be
     * @returns RegExp
     */
    _getRegexForStringSearch: (keyword: string, between?: Array<string>) => RegExp;
    /**
     *
     * example: con panna, con mozzarella, senza crosta, con torta
     * return: ["panna", "mozzarella", "cake"]
     *
     * @param regex
     * @param text
     * @returns Array<string>
     */
    _regexTextToArray: (regex: RegExp, text: string) => Array<String>;
    /**
     *
     * @param regex
     * @param text
     * @returns Array<string> (ingredients)
     */
    _regexTextToIngredientsArray: (regex: RegExp, text: string) => Array<string>;
    /**
     * Clean the string the user wrote: should contain only letters, numbers, or spaces
     * Ex. torta con carote, cipolla. Ma senza panna (e yogurt) -> torta con carote cipolla ma senza panna e yogurt
     */
    _cleanStringRegexp: (string: string, withSpace?: boolean) => string;
}
export default SearchParser;

import international, {  SupportedLanguage } from "./lang";

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
  lang: SupportedLanguage;

  constructor(lang: SupportedLanguage) {
    this.lang = lang;
  }

  /**
   *  Format: {query}-categoria-{string}-con-[string]-senza-[string]
   *  Example: pasta-al-forno-categoria-primo-con-olio-senza-uova
   *
   * @param {query: string, category?: string, include?: Array<string>, exclude?: Array<string>} data
   * @returns string
   */
  stringify = (data: {
    query?: string;
    category?: string;
    include?: Array<string>;
    exclude?: Array<string>;
  }) => {
    const { query, category, include, exclude } = data;
    const searchIndexes = international[this.lang].searchIndexesDict;
    let path = "";

    // Catgory will be added ad the beginning of the URL - always
    if (category) {
      path+=category.replace(/ /g, "-");
    }

    // Checking if the query was provided
    if (query) {
      // sanitize
      // Removing commas and replacing spaces with dashes
      const removeSpace = query.replace(/, |,| ,|  /g, " ").replace(/ /g, "-");
      // Adding to the path
      if (path) {
        path += "-";
      }
      path += removeSpace;
    }

    // Check if the include was provided
    if (include && include.length > 0) {
      // Formatting the ingredinets by joining with dash
      const text = searchIndexes.with + "-" + include.join("-");
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
      const text = searchIndexes.without + "-" + exclude.join("-");
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
  parse = (path: string) => {
    const text = international[this.lang].searchIndexesDict;
    const categories = international[this.lang].categories;
    const categoriesSingularToPlural = international[this.lang].categoriesSingularToPlural;
    // The user didn't type anything
    if (international[this.lang].searchIndexes.includes(path) || path.trim() === "") {
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
    const queryRegex =
      /(?=ricetta-)(.*)(?=-categoria)|(?=ricetta-)(.*)(?=-con)|(?=ricetta-)(.*)(?=-senza)|(?=ricetta-)(.*)/g;

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
    const categoryText = sanitize.match(categoryRegex)?.[0];

    // Finding the query by prior -> the only text remaining is the query
    const queryText = sanitize
      .replace(
        new RegExp(
          `${categoryText}-|${categoryText}|${text.recipe}-${includePath ? `|-${includePath}|${includePath}` : ""}${excludePath ? `|${excludePath}|-${excludePath}` : ""}`,
          "g"
        ),
        ""
      )
      .replace(/-/g, " ")
      .replace(new RegExp(`^(${international[this.lang].wordsToExcludeString})`), "") // Remove the first word if it's in the list of words to exclude
      .trim();


    // Splitting the ingredients and removing the words to exclude
    const includeText = this._regexTextToIngredientsArray(
      includeRegex,
      sanitize
    );

    // Splitting the ingredients and removing the words to exclude
    const excludeText = this._regexTextToIngredientsArray(
      excludeRegex,
      sanitize
    );

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
  _getRegexForStringSearch = (
    keyword: string,
    between?: Array<string>
  ): RegExp => {
    let betweenRegex = between
      ? `(?=-${keyword}|${between.map((e) => `-${e}`).join("|")})`
      : "";
    return new RegExp(
      `(?<=${keyword}-)(.*?)${betweenRegex}|(?<=${keyword}-)(.*)`,
      "g"
    );
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
  _regexTextToArray = (regex: RegExp, text: string): Array<String> => {
    const match = text.match(regex);

    const arr: Array<string> = [];
    match?.forEach((element) => {
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
  _regexTextToIngredientsArray = (
    regex: RegExp,
    text: string
  ): Array<string> => {
    const match = text.match(regex);

    const ingredients: Set<string> = new Set();
    match?.forEach((result) => {
      result.split("-").forEach((element) => {
        !international[this.lang].wordsToExclude.includes(element) && ingredients.add(element);
      });
    });

    return [...ingredients];
  };
}

export default SearchParser;

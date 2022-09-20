import { searchIndexes, wordsToExclude } from "./lang/it";

class SearchParser {
  lang: string;

  constructor(lang: string) {
    this.lang = lang;
  }

  stringify = (data: {
    query: string;
    category?: string;
    include?: Array<string>;
    exclude?: Array<string>;
  }) => {
    const { query, category, include, exclude } = data;
    let path = "";

    if (query) {
      // sanitize
      // Remove ricetta, any punctuation and replace space with -
      const removeSpace = query.replace(/, |,| ,|  /g, " ").replace(/ /g, "-");
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

  parse = (path: string) => {
    // The user didn't type anything
    if (searchIndexes.includes(path) || path.trim() === "") {
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
    const categoryText = sanitize.match(categoryRegex)?.[0];

    // Finding the query by prior -> the only text remaining is the query
    const queryText = sanitize
      .replace(
        new RegExp(
          `ricetta-${
            categoryText
              ? `|categoria-${categoryText}|-categoria-${categoryText}`
              : ""
          }${includePath ? `|-${includePath}|${includePath}` : ""}${
            excludePath ? `|${excludePath}|-${excludePath}` : ""
          }`,
          "g"
        ),
        ""
      )
      .replace(/-/g, " ")
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
      category: categoryText || "",
      include: includeText || [],
      exclude: excludeText || [],
    };
  };

  // Formatting the regex for the specific index
  // Eg. ricetta:  /(?=ricetta-)(.*)(?=-categoria)|(?=ricetta-)(.*)(?=-con)|(?=ricetta-)(.*)(?=-senza)|(?=ricetta-)(.*)/g;
  _getRegexForStringSearch = (keyword: string, between?: Array<string>) => {
    let betweenRegex = between
      ? `(?=-${keyword}|${between.map((e) => `-${e}`).join("|")})`
      : "";
    return new RegExp(
      `(?<=${keyword}-)(.*?)${betweenRegex}|(?<=${keyword}-)(.*)`,
      "g"
    );
  };

  //
  _regexTextToArray = (regex: RegExp, text: string) => {
    const match = text.match(regex);

    const arr: Array<string> = [];
    match?.forEach((element) => {
      arr.push(element);
    });

    return arr;
  };
  _regexTextToIngredientsArray = (regex: RegExp, text: string) => {
    const match = text.match(regex);

    const ingredients: Set<string> = new Set();
    match?.forEach((result) => {
      result.split("-").forEach((element) => {
        !wordsToExclude.includes(element) && ingredients.add(element);
      });
    });

    return [...ingredients];
  };
}

export default SearchParser;

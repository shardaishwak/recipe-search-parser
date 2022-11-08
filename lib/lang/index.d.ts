export declare enum SupportedLanguage {
    it = "it",
    en = "en"
}
declare const international: {
    it: {
        wordsToExclude: string[];
        wordsToExcludeString: string;
        searchIndexes: string[];
        searchIndexesDict: {
            recipe: string;
            category: string;
            with: string;
            without: string;
        };
        categories: string[];
        categoriesSingularToPlural: {
            antipasto: string;
            primo: string;
            secondo: string;
            contorno: string;
            dolce: string;
            bevanda: string;
        };
    };
    en: {
        wordsToExclude: string[];
        wordsToExcludeString: string;
        searchIndexes: string[];
        searchIndexesDict: {
            recipe: string;
            category: string;
            with: string;
            without: string;
        };
        categories: string[];
        categoriesSingularToPlural: {
            appetizer: string;
            primo: string;
            secondo: string;
            "side-dish": string;
            dessert: string;
            drink: string;
            sweet: string;
        };
    };
};
export default international;

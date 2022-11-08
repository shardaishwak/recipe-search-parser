"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSingularToPluralIT = exports.categoriesIT = exports.searchIndexesIT = exports.searchIndexesDictIT = exports.wordsToExcludeStringIT = exports.wordsToExcludeIT = void 0;
exports.wordsToExcludeIT = [
    "ricetta",
    "ricette",
    "categoria",
    "con",
    "senza",
    "e",
    "i",
    "la",
    "il",
    "lo",
    "le",
    "di",
    "ai",
    "un",
    "una",
    "uno",
    "un'",
    "alla",
    "allo"
];
exports.wordsToExcludeStringIT = exports.wordsToExcludeIT.reduce((acc, word) => {
    // ^(word)$ = starts and ends with word
    acc += `^${word} |(^${word}$)| ${word} |`;
    return acc;
}, "");
exports.searchIndexesDictIT = {
    recipe: "ricetta",
    category: "categoria",
    with: "con",
    without: "senza"
};
exports.searchIndexesIT = [exports.searchIndexesDictIT.recipe, exports.searchIndexesDictIT.category, exports.searchIndexesDictIT.with, exports.searchIndexesDictIT.without];
exports.categoriesIT = [
    "antipasti",
    "primi",
    "secondi",
    "contorni",
    "dolci",
    "bevande",
    "piatto-unico",
    // Singular check
    "antipasto",
    "primo",
    "secondo",
    "contorno",
    "dolce",
    "bevanda",
];
// the server takes only the plurals but the user may write in singular
// we need to change the singular to plural using dictionaary
// Will map the singular to plural
exports.categoriesSingularToPluralIT = {
    "antipasto": "antipasti",
    "primo": "primi",
    "secondo": "secondi",
    "contorno": "contorni",
    "dolce": "dolci",
    "bevanda": "bevande",
};
//# sourceMappingURL=it.js.map
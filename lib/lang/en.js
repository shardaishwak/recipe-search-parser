"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSingularToPluralEN = exports.categoriesEN = exports.searchIndexesEN = exports.searchIndexesDictEN = exports.wordsToExcludeStringEN = exports.wordsToExcludeEN = void 0;
exports.wordsToExcludeEN = [
    "recipe",
    "recipes",
    "category",
    "with",
    "without",
    "a",
    "of",
    "and",
    "the",
    "one",
];
exports.wordsToExcludeStringEN = exports.wordsToExcludeEN.reduce((acc, word) => {
    // ^ means starting with
    acc += `^${word} |(^${word}$)| ${word} |`;
    return acc;
}, "");
exports.searchIndexesDictEN = {
    recipe: "recipe",
    category: "category",
    with: "with",
    without: "without"
};
exports.searchIndexesEN = [exports.searchIndexesDictEN.recipe, exports.searchIndexesDictEN.category, exports.searchIndexesDictEN.with, exports.searchIndexesDictEN.without];
exports.categoriesEN = [
    "appetizers",
    "primi",
    "secondi",
    "side-dishes",
    "desserts",
    "drinks",
    "one-dish-meal",
    // Singular
    "appetizer",
    "primo",
    "secondo",
    "side dish",
    "dessert",
    "drink",
    "sweets",
    "sweent"
];
// the server takes only the plurals but the user may write in singular
// we need to change the singular to plural using dictionaary
// Will map the singular to plural
exports.categoriesSingularToPluralEN = {
    "appetizer": "appetizers",
    "primo": "primi",
    "secondo": "secondi",
    "side-dish": "side-dishes",
    "dessert": "desserts",
    "drink": "drinks",
    "sweet": "sweets",
};
//# sourceMappingURL=en.js.map
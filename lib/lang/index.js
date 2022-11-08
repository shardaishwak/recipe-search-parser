"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedLanguage = void 0;
const en_1 = require("./en");
const it_1 = require("./it");
var SupportedLanguage;
(function (SupportedLanguage) {
    SupportedLanguage["it"] = "it";
    SupportedLanguage["en"] = "en";
})(SupportedLanguage = exports.SupportedLanguage || (exports.SupportedLanguage = {}));
const international = {
    [SupportedLanguage.it]: { wordsToExclude: it_1.wordsToExcludeIT, wordsToExcludeString: it_1.wordsToExcludeStringIT, searchIndexes: it_1.searchIndexesIT, searchIndexesDict: it_1.searchIndexesDictIT, categories: it_1.categoriesIT, categoriesSingularToPlural: it_1.categoriesSingularToPluralIT },
    [SupportedLanguage.en]: { wordsToExclude: en_1.wordsToExcludeEN, wordsToExcludeString: en_1.wordsToExcludeStringEN, searchIndexes: en_1.searchIndexesEN, searchIndexesDict: en_1.searchIndexesDictEN, categories: en_1.categoriesEN, categoriesSingularToPlural: en_1.categoriesSingularToPluralEN }
};
exports.default = international;
//# sourceMappingURL=index.js.map
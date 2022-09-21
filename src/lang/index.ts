import { searchIndexesEN, wordsToExcludeEN, wordsToExcludeStringEN, searchIndexesDictEN, categoriesEN, categoriesSingularToPluralEN } from "./en";
import { categoriesIT, categoriesSingularToPluralIT, searchIndexesDictIT, searchIndexesIT, wordsToExcludeIT, wordsToExcludeStringIT } from "./it";

export enum SupportedLanguage {
  it = "it",
  en = "en"
}

const international = {
  [SupportedLanguage.it]: {wordsToExclude: wordsToExcludeIT, wordsToExcludeString: wordsToExcludeStringIT, searchIndexes: searchIndexesIT, searchIndexesDict: searchIndexesDictIT, categories: categoriesIT, categoriesSingularToPlural: categoriesSingularToPluralIT},
  [SupportedLanguage.en]: {wordsToExclude: wordsToExcludeEN, wordsToExcludeString: wordsToExcludeStringEN, searchIndexes: searchIndexesEN, searchIndexesDict: searchIndexesDictEN, categories: categoriesEN, categoriesSingularToPlural: categoriesSingularToPluralEN}
}

export default international;
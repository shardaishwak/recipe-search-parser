import { searchIndexesEN, wordsToExcludeEN, wordsToExcludeStringEN, searchIndexesDictEN, categoriesEN } from "./en";
import { categoriesIT, searchIndexesDictIT, searchIndexesIT, wordsToExcludeIT, wordsToExcludeStringIT } from "./it";

export enum SupportedLanguage {
  it = "it",
  en = "en"
}

const international = {
  [SupportedLanguage.it]: {wordsToExclude: wordsToExcludeIT, wordsToExcludeString: wordsToExcludeStringIT, searchIndexes: searchIndexesIT, searchIndexesDict: searchIndexesDictIT, categories: categoriesIT},
  [SupportedLanguage.en]: {wordsToExclude: wordsToExcludeEN, wordsToExcludeString: wordsToExcludeStringEN, searchIndexes: searchIndexesEN, searchIndexesDict: searchIndexesDictEN, categories: categoriesEN}
}

export default international;
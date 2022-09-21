import { searchIndexesEN, wordsToExcludeEN, wordsToExcludeStringEN, searchIndexesDictEN } from "./en";
import { searchIndexesDictIT, searchIndexesIT, wordsToExcludeIT, wordsToExcludeStringIT } from "./it";

export enum SupportedLanguage {
  it = "it",
  en = "en"
}

const international = {
  [SupportedLanguage.it]: {wordsToExclude: wordsToExcludeIT, wordsToExcludeString: wordsToExcludeStringIT, searchIndexes: searchIndexesIT, searchIndexesDict: searchIndexesDictIT},
  [SupportedLanguage.en]: {wordsToExclude: wordsToExcludeEN, wordsToExcludeString: wordsToExcludeStringEN, searchIndexes: searchIndexesEN, searchIndexesDict: searchIndexesDictEN}
}

export default international;
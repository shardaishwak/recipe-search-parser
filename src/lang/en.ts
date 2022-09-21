export const wordsToExcludeEN = [
  "recipe",
  "category",
  "with",
  "without",
  "a",
  "of",
  "and",
  "the",
  "one",
]

export const wordsToExcludeStringEN = wordsToExcludeEN.join("|");

export const searchIndexesDictEN = {
  recipe: "recipe",
  category: "category",
  with: "with",
  without: "without"
}
export const searchIndexesEN = [searchIndexesDictEN.recipe, searchIndexesDictEN.category, searchIndexesDictEN.with, searchIndexesDictEN.without];

export const categoriesEN = [
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
]

// the server takes only the plurals but the user may write in singular
// we need to change the singular to plural using dictionaary

// Will map the singular to plural

export const categoriesSingularToPluralEN = {
  "appetizer": "appetizers",
  "primo": "primi",
  "secondo": "secondi",

  "side-dish": "side-dishes",
  "dessert": "desserts",
  "drink": "drinks",
}

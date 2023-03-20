export const wordsToExcludeEN = [
  "recipe",
  "recipes",
  "category",
  "a",
  "of",
  "and",
  "the",
  "one",
]

export const wordsToExcludeStringEN = wordsToExcludeEN.reduce((acc, word) => {
  // ^ means starting with
  acc+=`^${word} |(^${word}$)| ${word} |`
  return acc;
}, "")

export const searchIndexesDictEN = {
  recipe: "recipe",
  category: "category",
  with: "ingredientsin",
  without: "ingredientsout",
  order: "order",
  simplecooking: "simplecooking",
  tags: "tags"
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
  "sweets",
  "sweent"
]

// the server takes only the plurals but the user may write in singular
// we need to change the singular to plural using dictionaary

// Will map the singular to plural

export const categoriesSingularToPluralEN = {
  "appetizer": "appetizers", // required in italian as the database only has the plural
  "primo": "primi",
  "secondo": "secondi",

  "side-dish": "side-dishes",
  "dessert": "desserts",
  "drink": "drinks",
  "sweet": "sweets",
}

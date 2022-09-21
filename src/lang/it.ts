export const wordsToExcludeIT = [
  "ricetta",
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
  "un",
  "una",
  "uno",
  "un'",
  "alla",
  "allo",
];

export const wordsToExcludeStringIT = wordsToExcludeIT.join("|");

export const searchIndexesDictIT = {
  recipe: "ricetta",
  category: "categoria",
  with: "con",
  without: "senza"
}
export const searchIndexesIT = [searchIndexesDictIT.recipe, searchIndexesDictIT.category, searchIndexesDictIT.with, searchIndexesDictIT.without];

export const categoriesIT = [
  "antipasti",
  "primi",
  "secondi",
  "contorni",
  "dolci",
  "bevande",
  "piatto-unico"
]
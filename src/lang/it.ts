export const wordsToExcludeIT = [
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

export const wordsToExcludeStringIT = wordsToExcludeIT.reduce((acc, word) => {
  // ^(word)$ = starts and ends with word
  acc+=`^${word} |(^${word}$)| ${word} |`
  return acc;
}, "")

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
  "piatto-unico",
  // Singular check
  "antipasto",
  "primo",
  "secondo",
  "contorno",
  "dolce",
  "bevanda",
  
]

// the server takes only the plurals but the user may write in singular
// we need to change the singular to plural using dictionaary

// Will map the singular to plural
export const categoriesSingularToPluralIT = {
  "antipasto": "antipasti",
  "primo": "primi",
  "secondo": "secondi",

  "contorno": "contorni",
  "dolce": "dolci",
  "bevanda": "bevande",
}
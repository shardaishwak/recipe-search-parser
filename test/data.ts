export const test_case_data_IT = [
  [
    {
      query: "banana alla fragola",
      category: "dolci",
      include: ["latte"],
      exclude: ["uova"],
    },
    "dolci-banana-alla-fragola-ingredientsin-latte-ingredientsout-uova",
  ],
  [
    {
      query: "banana",
      category: "",
      include: [],
      exclude: [],
    },
    "banana",
  ],
  [
    { query: "ricetta banana", category: "", include: [], exclude: [] },
    "ricetta-banana",
  ],
  [
    {
      query: "ricetta alla banana",
      category: "piatto-unico",
      include: ["panna", "mozarella", "zucchine"],
      exclude: ["olio", "uova", "panna"],
    },
    "piatto-unico-ricetta-alla-banana-ingredientsin-panna-mozarella-zucchine-ingredientsout-olio-uova-panna",
  ],
  [
    {
      query: "manzo affumicato in padella",
      category: "piatto-unico",
      include: ["saliccia", "tonno", "lattughe"],
      exclude: ["basicico", "arrosto"],
    },
    "piatto-unico-manzo-affumicato-in-padella-ingredientsin-saliccia-tonno-lattughe-ingredientsout-basicico-arrosto",
  ],
  [
    {
      query: "ricetta di tartufo",
      category: "antipasti",
      include: ["uova", "panna", "zucchine"],
      exclude: ["olio", "uova", "panna"],
    },
    "antipasti-ricetta-di-tartufo-ingredientsin-uova-panna-zucchine-ingredientsout-olio-uova-panna",
  ],
  [
    {
      query: "",
      category: "",
      include: ["farina 00 macinato"],
      exclude: []
    },
    "ingredientsin-farina_00_macinato"
  ],
  [
    {
      query: "",
      category: "",
      include: [],
      exclude:["farina 00 macinato", "uova cotta"]
    },
    "ingredientsout-farina_00_macinato-uova_cotta"
  ],
  [
    {
      query: "",
      category: "",
      include: ["crema di nocciole secche"],
      exclude: []
    },
    "ingredientsin-crema_di_nocciole_secche"
  ],
  [
    {
      query: "",
      category: '',
      include: [],
      exclude: [],
      order: "orderingtests",
      simplecooking: "simplecookingtest",
      tags: ["tag1", "tag2", "tag3"]
    },
    "ordine-orderingtests-simplecooking-simplecookingtest-tags-tag1-tag2-tag3"
  ],
  [
    {
      query: "hello",
      category: 'dolci',
      include: [],
      exclude: [],
      order: "",
      simplecooking: "",
      tags: ["tag1"]
    },
    "dolci-hello-tags-tag1"
  ],
  [
    {
      query: "hello",
      category: 'dolci',
      include: [],
      exclude: [],
      order: "",
      simplecooking: "",
      tags: ["tag1-2"]
    },
    "dolci-hello-tags-tag1_2"
  ],
  [{
    query: "hèéêëēėęàáâäæãåāîïíīįìôöòóœøōõûüùúū"
  }, "heeeeeeeaaaaaaaaiiiiiioooooooouuuuu"]
];

export const test_case_data_EN = [
  [
    {query: "banana ingredientsin strawberry", category: "sweet", include: ["milk"], exclude: ["egg"],}, 
    "sweet-banana-ingredientsin-strawberry-ingredientsin-milk-ingredientsout-egg"
  ],
  [
    {query: "banana", category: "", include: [], exclude: []},
    "banana"
  ],
  [
    {query: "recipe banana", category: "", include: [], exclude: []},
    "recipe-banana"
  ],
  [
    {query: "recipe ingredientsin banana", category: "first-dishes", include: ["panna", "mozzarella", "sugar"], exclude: ["oil", "egg", "other"]},
    "first-dishes-recipe-ingredientsin-banana-ingredientsin-panna-mozzarella-sugar-ingredientsout-oil-egg-other"
  ]
]

const formatData = (
  query: string,
  category: string,
  include: Array<string>,
  exclude: Array<string>,
  order?: string,
  simplecooking?: string,
  tags?: Array<string>

) => ({ query, category, include, exclude, order, simplecooking, tags });

// [output, input] - parse only
export const normal_test_data_IT = [
  ["ingredientsin zucchero", formatData("", "", ["zucchero"], [])],
  ["ingredientsin zucchero ingredientsout latte", formatData("", "", ["zucchero"], ["latte"])],
  [
    "bevande ricetta banana e zucchine ingredientsout tartufo ingredientsin zucchero panna ingredientsin olio",
    formatData(
      "banana e zucchine",
      "bevande",
      ["zucchero", "panna", "olio"],
      ["tartufo"]
    ),
  ],
  [
    "dolci ingredientsin fermento di latte ingredientsout lattosio e fruttosio",
    formatData("", "dolci", ["fermento", "latte"], ["lattosio", "fruttosio"]),
  ],
  [
    "ricetta-panna-cotta-ingredientsin-crema-di-mascarpone-ingredientsin-olio-ingredientsout-latte-e-ingredientsout-uova-ingredientsout-tartufo-ingredientsin-marmellata",
    formatData(
      "panna cotta",
      "",
      ["crema", "mascarpone", "olio", "marmellata"],
      ["latte", "uova", "tartufo"]
    ),
  ],
  ["fritti in padella", formatData("fritti in padella", "", [], [])],
  [
    "ingredientsout lattosio e formaggi",
    formatData("", "", [], ["lattosio", "formaggi"]),
  ],
  [
    "crostata ingredientsin crema pasticcera e fragola",
    formatData("crostata", "", ["crema", "pasticcera", "fragola"], []),
  ],
  [
    "spaghetti risottati ingredientsin zucchine e gamberi leggermente scottati",
    formatData(
      "spaghetti risottati",
      "",
      ["zucchine", "gamberi", "leggermente", "scottati"],
      []
    ),
  ],
  ["dolci", formatData("", "dolci", [], [])],
  ["ingredientsout malscalpone", formatData("", "", [], ["malscalpone"])],
  ["ingredientsin", formatData("", "", [], [])],
  ["ingredientsout", formatData("", "", [], [])],
  ["ingredientsin panna", formatData("", "", ["panna"], [])],
  [
    "ricetta di ishwak ingredientsin pesto alla panna, tartufo, gamberi rossi e zucchine ingredientsout il basilico e ingredientsout il formaggio",
    formatData(
      "ishwak", // Test case when adding user
      "",
      ["pesto", "panna", "tartufo", "gamberi", "rossi", "zucchine"],
      ["basilico", "formaggio"]
    ),
  ],
  [
    "ingredientsin panna, ingredientsin zucchine, ingredientsout formaggio",
    formatData("", "", ["panna", "zucchine"], ["formaggio"]),
  ],
  [
    "ricetta alla banana ingredientsin tartufo",
    formatData("banana", "", ["tartufo"], []),
  ],
  // testing the singular and plural category
  [
    "dolce banana",
    formatData("banana", "dolci", [], []),
  ],
  [
    "bevanda calda",
    formatData("calda", "bevande", [], []),
  ],
  [
    "primo pasta",
    formatData("pasta", "primi", [], []),
  ],
  [
    "dolce di tonno",
    formatData("tonno", "dolci", [], []),
  ],
  [
    "piatto unico ai carciofi",
    formatData("carciofi", "piatto-unico", [], []),
  ],
  [
    "unpelatoincucina",
    formatData("unpelatoincucina", "", [], []),
  ],
  [
    "unpelatoincucina ingredientsin panna",
    formatData("unpelatoincucina", "", ["panna"], []),
  ],
  [
    "i fichi della nonna lamela",
    formatData("fichi della nonna lamela", "", [], []),
  ],
  [
    "ricette per natale",
    formatData("per natale", "", [], []),
  ],
  [
    "ricette ingredientsin zucchero",
    formatData("", "", ["zucchero"], []),
  ],
  [
    "ricette ingredientsin la marmellata ingredientsout i fagiolini",
    formatData("", "", ["marmellata"], ["fagiolini"]),
  ],
  [
    "ricette ingredientsin la marmellata ingredientsout i fagiolini_cotti",
    formatData("", "", ["marmellata"], ["fagiolini cotti"]),
  ],
  [
    "ricette torta ingredientsin la marmellata ingredientsout i fagiolini ordine interactions simplecooking cooking tags cioccolato carciofo",
    formatData("torta", "", ["marmellata"], ["fagiolini"], "interactions", "cooking", ["cioccolato", "carciofo"]),
  ],
  [
    "tags simple_ingredients burro batta_malagna",
    formatData("", "", [], [], "", "", ["simple-ingredients", "burro", "batta-malagna"]),
  ],
  [
    "pasta con tonno",
    formatData("pasta con tonno", "", [], [], "", "", []),
  ]
];

export const normal_test_data_EN = [
  ["ingredientsin sugar", formatData("", "", ["sugar"], [])],
  ["appetizer", formatData("", "appetizers", [], [])],
  ["dessert recipe banana and zucchine ingredientsout tartufo ingredientsin zucchoero, panna and oil", formatData("banana and zucchine", "desserts", ["zucchoero", "panna", "oil"], ["tartufo"])],
  ["sweets", formatData("", "sweets", [], [])],

]

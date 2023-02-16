export const test_case_data_IT = [
  [
    {
      query: "banana alla fragola",
      category: "dolci",
      include: ["latte"],
      exclude: ["uova"],
    },
    "dolci-banana-alla-fragola-con-latte-senza-uova",
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
    "piatto-unico-ricetta-alla-banana-con-panna-mozarella-zucchine-senza-olio-uova-panna",
  ],
  [
    {
      query: "manzo affumicato in padella",
      category: "piatto-unico",
      include: ["saliccia", "tonno", "lattughe"],
      exclude: ["basicico", "arrosto"],
    },
    "piatto-unico-manzo-affumicato-in-padella-con-saliccia-tonno-lattughe-senza-basicico-arrosto",
  ],
  [
    {
      query: "ricetta di tartufo",
      category: "antipasti",
      include: ["uova", "panna", "zucchine"],
      exclude: ["olio", "uova", "panna"],
    },
    "antipasti-ricetta-di-tartufo-con-uova-panna-zucchine-senza-olio-uova-panna",
  ],
  [
    {
      query: "",
      category: "",
      include: ["farina 00 macinato"],
      exclude: []
    },
    "con-farina-00-macinato"
  ],
  [
    {
      query: "",
      category: "",
      include: [],
      exclude:["farina 00 macinato", "uova cotta"]
    },
    "senza-farina-00-macinato-uova-cotta"
  ],
  [
    {
      query: "con fiocchi di patate (o 2 patate lesse)",
      category: "",
      include: [],
      exclude: []
    },
    "con-fiocchi-di-patate-o-2-patate-lesse"
  ],
  [
    {
      query: "con crema di nocciole (o altra crema 100% frutta  secca)",
      category: "",
      include: [],
      exclude: []
    },
    "con-crema-di-nocciole-o-altra-crema-100-frutta-secca"
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
  ]
];

export const test_case_data_EN = [
  [
    {query: "banana with strawberry", category: "sweet", include: ["milk"], exclude: ["egg"],}, 
    "sweet-banana-with-strawberry-with-milk-without-egg"
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
    {query: "recipe with banana", category: "first-dishes", include: ["panna", "mozzarella", "sugar"], exclude: ["oil", "egg", "other"]},
    "first-dishes-recipe-with-banana-with-panna-mozzarella-sugar-without-oil-egg-other"
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
  ["con zucchero", formatData("", "", ["zucchero"], [])],
  ["con zucchero senza latte", formatData("", "", ["zucchero"], ["latte"])],
  [
    "bevande ricetta banana e zucchine senza tartufo con zucchero panna con olio",
    formatData(
      "banana e zucchine",
      "bevande",
      ["zucchero", "panna", "olio"],
      ["tartufo"]
    ),
  ],
  [
    "dolci con fermento di latte senza lattosio e fruttosio",
    formatData("", "dolci", ["fermento", "latte"], ["lattosio", "fruttosio"]),
  ],
  [
    "ricetta-panna-cotta-con-crema-di-mascarpone-con-olio-senza-latte-e-senza-uova-senza-tartufo-con-marmellata",
    formatData(
      "panna cotta",
      "",
      ["crema", "mascarpone", "olio", "marmellata"],
      ["latte", "uova", "tartufo"]
    ),
  ],
  ["fritti in padella", formatData("fritti in padella", "", [], [])],
  [
    "senza lattosio e formaggi",
    formatData("", "", [], ["lattosio", "formaggi"]),
  ],
  [
    "crostata con crema pasticcera e fragola",
    formatData("crostata", "", ["crema", "pasticcera", "fragola"], []),
  ],
  [
    "spaghetti risottati con zucchine e gamberi leggermente scottati",
    formatData(
      "spaghetti risottati",
      "",
      ["zucchine", "gamberi", "leggermente", "scottati"],
      []
    ),
  ],
  ["dolci", formatData("", "dolci", [], [])],
  ["senza malscalpone", formatData("", "", [], ["malscalpone"])],
  ["con", formatData("", "", [], [])],
  ["senza", formatData("", "", [], [])],
  ["con panna", formatData("", "", ["panna"], [])],
  [
    "ricetta di ishwak con pesto alla panna, tartufo, gamberi rossi e zucchine senza il basilico e senza il formaggio",
    formatData(
      "ishwak", // Test case when adding user
      "",
      ["pesto", "panna", "tartufo", "gamberi", "rossi", "zucchine"],
      ["basilico", "formaggio"]
    ),
  ],
  [
    "con panna, con zucchine, senza formaggio",
    formatData("", "", ["panna", "zucchine"], ["formaggio"]),
  ],
  [
    "ricetta alla banana con tartufo",
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
    "unpelatoincucina con panna",
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
    "ricette con zucchero",
    formatData("", "", ["zucchero"], []),
  ],
  [
    "ricette con la marmellata senza i fagiolini",
    formatData("", "", ["marmellata"], ["fagiolini"]),
  ],
  [
    "ricette con la marmellata senza i fagiolini ordine interactions simplecooking cooking tags cioccolato carciofo",
    formatData("", "", ["marmellata"], ["fagiolini"], "interactions", "cooking", ["cioccolato", "carciofo"]),
  ]
];

export const normal_test_data_EN = [
  ["with sugar", formatData("", "", ["sugar"], [])],
  ["appetizer", formatData("", "appetizers", [], [])],
  ["dessert recipe banana and zucchine without tartufo with zucchoero, panna and oil", formatData("banana and zucchine", "desserts", ["zucchoero", "panna", "oil"], ["tartufo"])],
  ["sweets", formatData("", "sweets", [], [])],

]

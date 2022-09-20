export const test_case_data = [
  [
    {
      query: "banana alla fragola",
      category: "dolci",
      include: ["latte"],
      exclude: ["uova"],
    },
    "banana-alla-fragola-categoria-dolci-con-latte-senza-uova",
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
    "ricetta-alla-banana-categoria-piatto-unico-con-panna-mozarella-zucchine-senza-olio-uova-panna",
  ],
  [
    {
      query: "manzo affumicato in padella",
      category: "piatto-unico",
      include: ["saliccia", "tonno", "lattughe"],
      exclude: ["basicico", "arrosto"],
    },
    "manzo-affumicato-in-padella-categoria-piatto-unico-con-saliccia-tonno-lattughe-senza-basicico-arrosto",
  ],
  [
    {
      query: "ricetta di tartufo",
      category: "antipasti",
      include: ["uova", "panna", "zucchine"],
      exclude: ["olio", "uova", "panna"],
    },
    "ricetta-di-tartufo-categoria-antipasti-con-uova-panna-zucchine-senza-olio-uova-panna",
  ],
];

const formatData = (
  query: string,
  category: string,
  include: Array<string>,
  exclude: Array<string>
) => ({ query, category, include, exclude });

// [output, input] - parse only
export const normal_test_data = [
  ["con zucchero", formatData("", "", ["zucchero"], [])],
  ["con zucchero senza latte", formatData("", "", ["zucchero"], ["latte"])],
  [
    "ricetta banana e zucchine senza tartufo categoria latte con zucchero panna con olio",
    formatData(
      "banana e zucchine",
      "latte",
      ["zucchero", "panna", "olio"],
      ["tartufo"]
    ),
  ],
  [
    "categoria dolci con fermento di latte senza lattosio e fruttosio",
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
  ["categoria dolci", formatData("", "dolci", [], [])],
  ["senza malscalpone", formatData("", "", [], ["malscalpone"])],
  ["con", formatData("", "", [], [])],
  ["senza", formatData("", "", [], [])],
  ["con panna", formatData("", "", ["panna"], [])],
  [
    "ricetta di ishwak con pesto alla panna, tartufo, gamberi rossi e zucchine senza il basilico e senza il formaggio",
    formatData(
      "di ishwak", // Test case when adding user
      "",
      ["pesto", "panna", "tartufo", "gamberi", "rossi", "zucchine"],
      ["basilico", "formaggio"]
    ),
  ],
  [
    "con panna, con zucchine, senza formaggio",
    formatData("", "", ["panna", "zucchine"], ["formaggio"]),
  ],
];

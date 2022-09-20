<h1>Recipe Search Parser</h1>
<p>An algorithms for transforming natural language search into categories. Allows the users input to be formatted into categories and then used as system for filtering and grouping.</p>

## Installation

<p>Using npm</p>

```bash
npm install recipe-search-parser
```

<p>Using yarn</p>

```bash
yarn add recipe-search-parser
```

## Usage

<p>Import the main class</p>

```javascript
import SearchParser from "recipe-search-parser";

const searchParser = new SearchParser();
```

### Stringify

<p>The <code>searchParser.stringify(data)</code> takes four parameters </p>
<ul>
  <li>query: the normal text the user searched for</li>
  <li>categories: the category in which the item is</li>
  <li>include: list of ingredients that the result should include</li>
  <li>exclude: list of ingredients that the result should exclude</li>
</ul>
  
```javascript
const query = "cake with chocolate"
const category = "sweet"
const include = ["sugar", "flour"]
const exclude = ["salt"]

searchParser({
  query,
  category,
  include,
  exclude
})

// Return: cake-with-cholocate-categoria-sweet-con-sugar-flour-senza-salt

```


### Parse
<p>The <code>searchParser.parse(data)</code> takes one parameter <code>URL</code>. The string is then parsed and formatted into query, category, include and exclude. </p>

```javascript
const URL = "cake-with-cholocate-categoria-sweet-con-sugar-flour-senza-salt"

searchParser.parse(URL)

// Return: {
// query: "cake with chocolate",
// category: "sweet",
// include: ["sugar", "flour"],
// exclude: ["salt"]

```

## Contribute
You are welcome to contribute!

## Licence
[MIT](https://choosealicense.com/licenses/mit/)


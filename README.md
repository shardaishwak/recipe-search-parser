<h1>Recipe Search Parser</h1>
<h3>An algorithms for transforming natural language search into categories. Allows the users input to be formatted into categories and then used as system for filtering and grouping.</h3>

<h2>Installation</h2>
<p>Using npm</p>
<pre><code>npm install recipe-search-parser
</code></pre>
<p>Using yarn</p  >
<pre><code>yarn add recipe-search-parser
</code></pre>

<h2>Usage</h2>
<p>Import the main class</p>

```
import SearchParser from 'recipe-search-parser';

const searchParser = new SearchParser();
```

<h3>Stringify</h3>
<p>The <code>searchParser.stringify(data)</code> takes four parameters </p>
<ul>
  <li>query: the normal text the user searched for</li>
  <li>categories: the category in which the item is</li>
  <li>include: list of ingredients that the result should include</li>
  <li>exclude: list of ingredients that the result should exclude</li>
</ul>
  
```
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


<h3>Parse</h3>
<p>The <code>searchParser.parse(data)</code> takes one parameter <code>URL</code>. The string is then parsed and formatted into query, category, include and exclude. </p>

```

const URL = "cake-with-cholocate-categoria-sweet-con-sugar-flour-senza-salt"

searchParser.parse(URL)

// Return: {
// query: "cake with chocolate",
// category: "sweet",
// include: ["sugar", "flour"],
// exclude: ["salt"]

```

<h3>Contribute</h3>
<p>You are welcome to contribute!</p>

<h3>Licence</h3>
<a href="https://choosealicense.com/licenses/mit/">MIT</a>
```

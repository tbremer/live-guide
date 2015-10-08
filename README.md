live-guide
---
`live-guide` is a subset of Markdown that allows developers one place to create both documentation and a styleguide for their end users. **Simply write comments, get styleguides!**

## Example:
```css
/**
 * ### Links
 * Link do not need any special class names to match stylistically, however they should follow some convetions
 * - links should direct users through the page
 * - links should direct pages to outside pages or pages of content within the site structure
 * - links **should not** be used to trigger user actions such as modals.
 *
 * @example html
 * <a href="#">I am a link</a>
 */
a {
    display: inline-block;
    color: var(--accent);
    text-decoration: none;
    vertical-align: middle;
    font-weight: 700;
    border-bottom: 1px solid transparent;
}

a + a {
    margin-top: 1vw;
}

a:hover {
    border-bottom: 1px solid var(--primary-dk);
}
```

## Use as module:
```javascript
const styleguide = require('live-guide');
const options = {
    input: "src/**/*.css",
    resources: ['path/to/compiled/style.css', 'path/to/other/required/files/app.js']
};

styleguide(options)
    .then(function(data) {
        // Do something after styleguide is compiled.
        // data refers to an array of objects containing all the relevant data from your build
    });
```

### Options
##### input
**type:** `path`

**description:** Glob pattern to files to read comments from.

**required:** true

**default:** *none*

---

##### output
**type:** `path`

**description:** Where to export HTML files.

**required:** false

**default:** *./styleguide*

---

##### resources
**type:** `Array`

**description:** Path (relative or absolute) to files to import into styleguide examples

**required:** false

**default:** *none*

---

##### name
**type:** `String`

**description** name of style guide

**required:** false

**default:** *Styleguide*

---

## Use in command line:
```shell
$ npm install --global live-guide
$ live-guide --input="path/to/**/*.css" --output=/var/www/styleguide --resource path/to/style.css another/path/here.js
```

## Command Line API
```shell
styleguider --input **/*.css [options]

Options:
  --input, -i     file(s) (glob pattern) that should be evaulated and built into the Styleguide  [required]
  --output, -o    Where should the output styleguide go? Defaults to current working directory /styleguide
  --resource, -r  additional resources to be loaded into the code example iframes  [array]
  --name, -n      name for the style guide or product
  --help, -h      Show help  [boolean]

```

## Comments Syntax

#### @author
**Description:** Contribute the code to someone.
**Example:**
```
/* @author Jan Doe */

// @author Jon Doe
```

#### @description
**Description:** Set a description for this section of the styleguide, generally used after an `@title`
**Example:**
```
/* @description This describes your component or module */

//@description This describes your component or module
```

#### @example
**Description:** A code example, similar to writing code blocks in Markdown
*Any example will need a blank comment line after it.
You can add blank lines in examples with `
`.*
**Example:**
```
//@example
//<button class="btn">Click me, I do stuff!</button>
//


/*
@example
*<button class="btn">Click me, I do stuff!</button>
*/
```

#### @skip
**Description:** Allows line to be skipped on output


#### @title
**Description:** The title of the component, module or API you are developing


#### @todo
**Description:** Let users know what needs to be done in this section of your styleguide


#### @url
**Description:** Add a link to the styleguide, automatically opens in a new tab


#### @writeName
**Description:** If you want the file name to be different than the title, for instance setting up an index page.
*There is no need to provide a file extension*
## Todo
- Log whats happening.
- Internal Modules
    1. write-html
            - use all async solutions
- Handlebars
	1. helpers
    	-  resource allow HTTP/S resources.

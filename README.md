live-guide
---

**THIS IS VERY MUCH UNDER DEVELOPMENT, API IS SURE TO CHANGE**

Use as module:
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

Use in command line:
```bash
$ npm install --global live-guide
$ live-guide --input="path/to/**/*.css" --output=/var/www/styleguide --resource path/to/style.css another/path/here.js
```
## Module API

#### @author
**Description:** Contribute the code to someone



**Example:**
```
/* @example Jan Doe */

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

*Any example written in a single line comments will need a blank comment line `//` after it.*

**Example:**
```
//@example
//<button class="btn">Click me, I do stuff!</button>//


/*
@example
*<button class="btn">Click me, I do stuff!//</button>
*/
```


#### @title
**Description:** The title of the component, module or API you are developing






#### @todo
**Description:** Let users know what needs to be done in this section of your style guide






#### @url
**Description:** Add a link to the styleguide, automatically opens in a new tab






#### @wrietName
**Description:** If you want the file name to be different than the title, for instance setting up an index page. *There is no need to provide a file extension*




## Todo





- Log whats happening.
- Internal Modules
    1. write-html
            - use all async solutions
- Handlebars
	1. helpers
    	-  resource allow HTTP/S resources.

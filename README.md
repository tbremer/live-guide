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

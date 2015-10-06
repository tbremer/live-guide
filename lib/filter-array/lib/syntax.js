'use strict';
/**
 * object is organized by:
 *  Main key -- call out for the pattern, should be it's prefered alias.
 *    description: String to tell the users how to use your syntax. [not required]
 *    pattern: regex to match the key. -- regex (should we convert no regx to regex?) [required]
 *    filter: quick replace structure.
 *      takes string to be filtered
 *      returns modfied string
 *      sends string, respondes with string
 *    task: function to run and return more complex strings.
 *      takes in an object to be modified
 *      returns the modified object
 *
 * NOTES:
 *  - filters are always run before tasks and the modify the strong
 *  - tasks *could* no longer match after the filter is run as they are intended to modify the string
 */

module.exports = {
  author: {
    description: 'Contribute the code to someone.',
    example: ['/* @author Jan Doe */', `// @author Jon Doe`],
    pattern: /@author[^\S\n]+?(.+)/g,
    filter: '<p class="author">**Authored by:** *$1*</p>',
  },

  description: {
    description: 'Set a description for this section of the styleguide, generally used after an `@title`',
    example: ['/* @description This describes your component or module */', '//@description This describes your component or module'],
    pattern: /@description[^\S\n]+?(.+)/g,
    filter: '*$1*'
  },

  example: {
    description: 'A code example, similar to writing code blocks in Markdown',
    example: [`//@example\n//<button class="btn">Click me, I do stuff!</button>\n//\n`, `/*\n@example\n*<button class="btn">Click me, I do stuff!</button>\n*/`],
    notes: 'Any example written in a single line comments will need a blank comment line `//` after it.',
    pattern: /^@example(.*?)?$\s((?:^.+$\s?)+)/gm,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, function(match, language, snippet) {
        if (!snippet) { return match; }
        language = language || '';
        return `\`\`\`${language.trim()}\n${snippet}\n\`\`\`\n`;
      });
    }
  },

  title: {
    description: `The title of the component, module or API you are developing`,
    pattern: /^@title (.*)$/gm,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, (match, title) => {
        if (!title) { return match; }

        obj.title = title.trim();

        return `# ${title.trim()}\n---`;
      });
    }
  },

  todo: {
    description: 'Let users know what needs to be done in this section of your styleguide',
    pattern: /^@(?:todo|task) (.*)$/gm,
    filter: `**TODO:** *$1*`
  },

  url: {
    description: 'Add a link to the styleguide, automatically opens in a new tab',
    pattern:/@url[^\S\n]+?(.+)/g,
    filter: '<a href="$1" target="_blank">$1</a>'
  },

  wrietName: {
    description: 'If you want the file name to be different than the title, for instance setting up an index page.',
    notes:  'There is no need to provide a file extension',
    pattern: /@writeName(.+)/g,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, (match, name) => {
        if (!name) { return ''; }
        obj.writeName = name.trim();

        return '';
      })
    }
  }
};

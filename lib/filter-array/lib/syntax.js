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

  color: {
    description: 'Create a color dot with name & description',
    example: ['@color #131313 [Black] - Black is used for body copy'],
    pattern: /^\s*@color\s+(.+?)(?:\s*\[(.+)?\]\s*)?(?:\s+-\s+(.+)?\s*)?$/gm,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, function(str, cssValue, name, description) {
        if (!cssValue) { return str; }

        name = name || '';
        description = description || '';

        return `<section class="color-palette">
        <div class="color-palette__dot" style="background-color: ${cssValue}"></div>
        <div class="color-palette__name">${name}</div>
        <div class="color-palette__description">${description}</div>
        </section>`;
      });
    }
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
    notes: 'Any example will need a blank comment line after it.\nYou can add blank lines in examples with `\n`.',
    pattern: /^@example(.*?)?$\s((?:^.+$\s?)+)/gm,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, function(match, language, snippet) {
        if (!snippet) { return match; }
        language = language || '';

        return `\`\`\`${language.trim()}\n${snippet}\n\`\`\`\n`;
      });
    }
  },

  skip: {
    description: `Allows line to be skipped on output`,
    pattern: /^(@skip.*)$/gm,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, (match, capture) => '');
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
    filter: `\n<div class="todo">**TODO:** *$1*</div>\n`
  },

  url: {
    description: 'Add a link to the styleguide, automatically opens in a new tab',
    pattern:/@url[^\S\n]+?(.+)/g,
    filter: '<a href="$1" target="_blank">$1</a>'
  },

  writename: {
    description: 'If you want the file name to be different than the title, for instance setting up an index page.',
    notes:  'There is no need to provide a file extension',
    pattern: /@writename(.+)/ig,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, (match, name) => {
        if (!name) { return ''; }
        obj.writeName = name.trim();

        return '';
      })
    }
  }
};

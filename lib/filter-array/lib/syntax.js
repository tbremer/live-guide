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
    description: 'Contribute the code to someone',
    pattern: /@author[^\S\n]+?(.+)/g,
    filter: '<p class="author">**Authored by:** *$1*</p>',
  },

  description: {
    pattern: /@description[^\S\n]+?(.+)/g,
    filter: '*$1*'
  },

  example: {
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
    pattern: /^@(?:todo|task) (.*)$/gm,
    filter: `**TODO:** *$1*`
  },

  url: {
    pattern:/@url[^\S\n]+?(.+)/g,
    filter: '<a href="$1" target="_blank">$1</a>'
  },

  wrietName: {
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


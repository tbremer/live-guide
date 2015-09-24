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
  example: {
    pattern: /^@example(.*)?((?:.|\n)+?)\n\s*?$/gm,
    task: function(obj) {
      obj.filteredComments = obj.filteredComments.replace(this.pattern, function(match, language, snippet) {
        if (!snippet) { return match }

        language = language || '';

        return `\`\`\`${language.trim()}${snippet}\n\`\`\`\n`;
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

        return `#${title.trim()}\n---`;
      });
    }
  },

  todo: {
    pattern: /^@(?:todo|task) (.*)$/gm,
    filter: `**TODO:** *$1*`
  },

  skipFile: {
    description: 'Ability to have a file skipped over entirely, useful for globbing entire directories, whiel still avoiding files',
    pattern: /^(?:@skip-file|@ignore-file)/gm,
    task: function(obj) {
      if (this.pattern.test(obj.rawComments)) {
        obj.skipFile = true;
      }
    }
  }
};


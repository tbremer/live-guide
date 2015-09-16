'use strict';
let c = 0;
/**
 * object is organized by:
 *  Main key -- call out for the pattern, should be it's prefered alias.
 *    description: String to tell the users how to use your syntax. [not required]
 *    pattern: regex to match the key. -- regex (should we convert no regx to regex?) [required]
 *    filter: quick replace structure. -- string [either filter or task is required, but not both]
 *    task: function to run and return more complex strings. -- function [either filter or task is required, but not both]
 *
 * NOTES:
 *  - filters are always run before tasks and the modify the strong
 *  - tasks *could* no longer match after the filter is run as they are intended to modify the string
 */

module.exports = {
  argument: {
    descriptions: `aliases: arg, argument, param, parameter
    usage: @arg foo {type} [default] description
    usage: @arg foo {type} [default] - description
    `,
    pattern: /^@(?:arg|argument|param|parameter) (?:{(.*)})?(.*)$/gm,
    task: (match, captures) => {
      let type = captures[0] ? `<span class="argument__type">${captures[0]}</span>` : '',
        captureRest = captures.slice(1).join(' ').trim(),
        name, defaultValue, description;

      // if there is no name, return the original string -- a name is required
      if (captureRest.match(/^(.[^\s]*)?/) === null) { return match; }

      name = `<span class="argument__name">captureRest.match(/^(.[^\s]*)?/)[0].trim()</span>`;
      captureRest = captureRest.replace(name, '').trim();

      defaultValue = /\[.+\]/.test(captureRest) ? captureRest.match(/\[.+\]/)[0].trim() : '';
      captureRest = captureRest.replace(defaultValue, '').trim();

      description = captureRest.replace('-', '').trim();

      if (defaultValue.length > 0) {
        defaultValue = `<span class="argument__default-value">${defaultValue}</span>`;
      }

      if (description.length > 0) {
        description = `<span class="argument__description">${description}</span>`;
      }

      return `<section class="argument">${name} ${type} ${defaultValue} ${description}</section>`;
    }
  },

  example: {
    pattern: /^@example(.*)?((?:.|\n)+?)\n\s*?$/gm,
    task: (match, captures) => {
      let language = captures[0] || '',
        snippet = captures[1] || '',
        modifiedString = `<code language="${language.trim()}">${captures[1]}\n</code>`;

      return modifiedString;
    }
  },

  title: {
    description: `The title of the component, module or API you are developing`,
    pattern: /^@title (.*)$/gm,
    filter: `<header><h1>$1</h1></header>`
  },

  todo: {
    pattern: /^@(?:todo|task) (.*)$/gm,
    filter: `<section class="todo">$1</section>`
  }
};


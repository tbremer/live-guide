'use strict';

const Handlebars = require('handlebars');

module.exports = function() {
  Handlebars.registerHelper('contains', function(str, obj, options) {
    /*
     * Is this an object?
     */
    if (obj.constructor === Object) {

      if (str in obj) {
        return new Handlebars.SafeString(options.fn(this))
      } else if(Object.keys(obj).map((k) => obj[k]).indexOf(str) !== -1) {
        return new Handlebars.SafeString(options.fn(this))
      } else {
        return new Handlebars.SafeString(options.inverse(this))
      }

    }

    /*
     * Is this an Array?
     */
    if (obj.constructor === Array) {

      if (obj.indexOf(str) !== -1) {
        return new Handlebars.SafeString(options.fn(this))
      } else {
        return new Handlebars.SafeString(options.inverse(this))
      }

    }

    /*
     * You're likely a String
     */
    if (new RegExp(obj).test(str)) {
      return new Handlebars.SafeString(options.fn(this))
    } else {
      return new Handlebars.SafeString(options.inverse(this))
    }

    return '';
  });
};

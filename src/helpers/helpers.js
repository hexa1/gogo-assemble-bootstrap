module.exports.register = function (Handlebars, options) {
  'use strict';

  // TODO: make some meaningful helper

  Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
    if (haystack && needle) {
      return haystack.replace(needle, replacement);
    } else {
      return '';
    }
  });

};
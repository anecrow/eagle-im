/**
 * @example
 * {} => ""
 * {a:"a",b:[1,"B"]} => "a=a&b=1,B"
 * @param {Object} data
 */
export const paramStringify = (data = {}) =>
  decodeURIComponent(new URLSearchParams(data));

/**
 * @example
 * {} => ""
 * {a:"a",b:[1,"B"]} => "a=a&b=1,B"
 * @param {Object} data
 */
export const paramStringify = (data = {}) =>
  decodeURIComponent(new URLSearchParams(data));

/**
 * @param {Promise<Response>} promiseObj
 * @returns {Promise<{status:String,data:any}>}
 */
export const responseThenJSON = (promiseObj) =>
  new Promise((resolve, reject) =>
    promiseObj
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error))
  );

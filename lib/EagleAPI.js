//** build with Eagel Image Management software API doc*/
//** 1.11 Build35（2020-09-07） */

import fetch from "node-fetch";

class EagleAPI {
  static origin = "http://localhost:41595";

  // --- Utils --- //
  static jointURL = (className, functionName) =>
    `${EagleAPI.origin}/api/${className}/${functionName}`;
  static jointFunctionName = (functionName, attrsObj) => {
    if (!attrsObj) return functionName;
    functionName += "?";
    let attrNames = Object.getOwnPropertyNames(attrsObj);
    attrNames.forEach((attrName, index) => {
      if (index !== 0) functionName += "&";
      functionName += `${attrName}=${attrsObj[attrName]}`;
    });
    return functionName;
  };
  static call = (className, functionName, data) =>
    fetch(
      EagleAPI.jointURL(className, functionName),
      data
        ? {
            method: "POST",
            body: JSON.stringify(data),
          }
        : undefined
    );

  // --- APIs --- //
  static application = {
    info: () => EagleAPI.call("application", "info"),
  };

  static folder = {
    /**
     * @param {String}folderName
     */
    create: (folderName) =>
      EagleAPI.call("folder", "create", { folderName: folderName }),
    /**
     * @param {String}folderId
     * @param {String}folderName
     */
    rename: (folderId, folderName) =>
      EagleAPI.call("folder", "rename", {
        folderId: folderId,
        folderName: folderName,
      }),
    list: () => EagleAPI.call("folder", "list"),
    listRecent: () => EagleAPI.call("folder", "listRecent"),
  };

  static item = {
    /**
     * @param {String} path
     * @param {String} name
     * @param {Object} [opts]
     * @param {String} opts.website
     * @param {String[]} opts.tags
     * @param {String} opts.annotation
     * @param {String}  opts.folderId
     */
    addFromURL: function (url, name, opts) {
      return EagleAPI.call(
        "item",
        "addFromURL",
        Object.assign({ url: url, name: name }, opts)
      );
    },
    /**
     * @param {Object} items
     * @param {String} items.url
     * @param {String} items.name
     * @param {Object} items.opts
     * @param {String} items.opts.website
     * @param {String[]} items.opts.tags
     * @param {String} items.opts.annotation
     * @param {Number} items.opts.modificationTime
     * @param {Object} items.opts.headers
     * @param {String} items.opts.headers.referer
     * @param {String}  [folderId]
     */
    addFromURLs: function (items, folderId) {
      return EagleAPI.call("item", "addFromURLs", {
        items: items,
        folderId: folderId,
      });
    },
    /**
     * @param {String} path
     * @param {String} name
     * @param {Object} [opts]
     * @param {String} opts.website
     * @param {String[]} opts.tags
     * @param {String} opts.annotation
     * @param {String}  opts.folderId
     */
    addFromPath: function (path, name, opts) {
      return EagleAPI.call(
        "item",
        "addFromPath",
        Object.assign({ path: path, name: name }, opts)
      );
    },
    /**
     * @param {Object} items
     * @param {String} items.path
     * @param {String} items.name
     * @param {Object} items.opts
     * @param {String} items.opts.website
     * @param {String[]} items.opts.tags
     * @param {String} items.opts.annotation
     * @param {String}  [folderId]
     */
    addFromPaths: function (items, folderId) {
      return EagleAPI.call("item", "addFromPaths", {
        items: items,
        folderId: folderId,
      });
    },
    /**
     * @param {String} url
     * @param {String} name
     * @param {Object} [opts]
     * @param {String} opts.base64
     * @param {String[]} opts.tags
     * @param {String} opts.annotation
     * @param {String}  opts.folderId
     */
    addBookmark: function (url, name, opts) {
      return EagleAPI.call(
        "item",
        "addBookmark",
        Object.assign({ url: url, name: name }, opts)
      );
    },
    /**
     * @param {String} id
     */
    info: (id) =>
      EagleAPI.call("item", EagleAPI.jointFunctionName("info", { id: id })),
    /**
     * @param {String} id
     */
    thumbnail: (id) =>
      EagleAPI.call("item", EagleAPI.jointFunctionName("call", { id: id })),
    /**
     * @param {Object} [opts]
     * @param {Number} opts.limit
     * @param {String} opts.orderBy
     * @param {String[]}  opts.keyword
     * @param {String} opts.ext
     * @param {String[]} opts.tags
     * @param {String[]} opts.folders
     */
    list: function (opts) {
      return EagleAPI.call("item", EagleAPI.jointFunctionName("list", opts));
    },
    addBookmark_dev: () => {
      console.error("dev function");
    },
    /**
     * @param {String} id
     */
    refreshPalette: (id) => EagleAPI.call("item", "refreshPalette", { id: id }),
    /**
     * @param {String} id
     */
    refreshThumbnail: (id) =>
      EagleAPI.call("item", "refreshThumbnail", { id: id }),
    /**
     * @param {String} id
     * @param {Object} [opts]
     * @param {String[]} opts.tags
     * @param {String} opts.annotation
     * @param {String} opts.url
     * @param {Number} opts.start
     */
    update: function (id, opts) {
      return EagleAPI.call(
        "item",
        "addBookmark",
        Object.assign({ id: id }, opts)
      );
    },
  };
  static library = {
    info: () => EagleAPI.call("item", "info"),
    history: () => EagleAPI.call("item", "history"),
    /**
     * @param {String} libraryPath
     */
    switch: (libraryPath) =>
      EagleAPI.call("item", "switch", { libraryPath: libraryPath }),
  };
}

export default EagleAPI;

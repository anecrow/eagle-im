//** build with Eagel Image Management software API doc*/
//** 1.11 Build35（2020-09-07） */

import FetchURL from "./FetchURL.js";

class base {
  static baseURL = "http://localhost:41595/api/";
  static getBase = () => base.baseURL;
}
class application extends base {
  static info = () =>
    new FetchURL(
      "application",
      "info",
      undefined,
      "GET",
      application.getBase()
    ).callFetch();
}
class folder extends base {
  /**
   * @param {String}folderName
   */
  static create = (folderName) =>
    new FetchURL(
      "folder",
      "create",
      { folderName: folderName },
      "POST",
      folder.getBase()
    ).callFetch();
  /**
   * @param {String}folderId
   * @param {String}folderName
   */
  static rename = (folderId, folderName) =>
    EagleAPI.call(
      "folder",
      "rename",
      {
        folderId: folderId,
        folderName: folderName,
      },
      "POST",
      folder.getBase()
    );
  static list = () =>
    new FetchURL(
      "folder",
      "list",
      undefined,
      "GET",
      folder.getBase()
    ).callFetch();
  static listRecent = () =>
    new FetchURL(
      "folder",
      "listRecent",
      undefined,
      "GET",
      folder.getBase()
    ).callFetch();
}

class item extends base {
  /**
   * @param {String} path
   * @param {String} name
   * @param {Object} [opts]
   * @param {String} opts.website
   * @param {String[]} opts.tags
   * @param {String} opts.annotation
   * @param {String}  opts.folderId
   */
  static addFromURL(url, name, opts) {
    return EagleAPI.call(
      "item",
      "addFromURL",
      Object.assign({ url: url, name: name }, opts),
      "POST",
      folder.getBase()
    );
  }
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
  static addFromURLs(items, folderId) {
    return EagleAPI.call(
      "item",
      "addFromURLs",
      {
        items: items,
        folderId: folderId,
      },
      "POST",
      folder.getBase()
    );
  }
  /**
   * @param {String} path
   * @param {String} name
   * @param {Object} [opts]
   * @param {String} opts.website
   * @param {String[]} opts.tags
   * @param {String} opts.annotation
   * @param {String}  opts.folderId
   */
  static addFromPath(path, name, opts) {
    return EagleAPI.call(
      "item",
      "addFromPath",
      Object.assign({ path: path, name: name }, opts),
      "POST",
      folder.getBase()
    );
  }
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
  static addFromPaths(items, folderId) {
    return EagleAPI.call(
      "item",
      "addFromPaths",
      {
        items: items,
        folderId: folderId,
      },
      "POST",
      folder.getBase()
    );
  }
  /**
   * @param {String} url
   * @param {String} name
   * @param {Object} [opts]
   * @param {String} opts.base64
   * @param {String[]} opts.tags
   * @param {String} opts.annotation
   * @param {String}  opts.folderId
   */
  static addBookmark(url, name, opts) {
    return EagleAPI.call(
      "item",
      "addBookmark",
      Object.assign({ url: url, name: name }, opts),
      "POST",
      folder.getBase()
    );
  }
  /**
   * @param {String} id
   */
  static info = (id) =>
    new FetchURL(
      "item",
      "info",
      { id: id },
      "GET",
      folder.getBase()
    ).callFetch();
  /**
   * @param {String} id
   */
  static thumbnail = (id) =>
    new FetchURL(
      "item",
      "call",
      { id: id },
      "GET",
      folder.getBase()
    ).callFetch();
  /**
   * @param {Object} [opts]
   * @param {Number} opts.limit
   * @param {String} opts.orderBy
   * @param {String[]}  opts.keyword
   * @param {String} opts.ext
   * @param {String[]} opts.tags
   * @param {String[]} opts.folders
   */
  static list(opts) {
    return new FetchURL(
      "item",
      "list",
      opts,
      "GET",
      folder.getBase()
    ).callFetch();
  }
  static addBookmark_dev = () => {
    throw new Error("dev function");
  };
  /**
   * @param {String} id
   */
  static refreshPalette = (id) =>
    new FetchURL(
      "item",
      "refreshPalette",
      { id: id },
      "POST",
      folder.getBase()
    ).callFetch();
  /**
   * @param {String} id
   */
  static refreshThumbnail = (id) =>
    new FetchURL(
      "item",
      "refreshThumbnail",
      { id: id },
      "POST",
      folder.getBase()
    ).callFetch();
  /**
   * @param {String} id
   * @param {Object} [opts]
   * @param {String[]} opts.tags
   * @param {String} opts.annotation
   * @param {String} opts.url
   * @param {Number} opts.start
   */
  static update(id, opts) {
    return EagleAPI.call(
      "item",
      "addBookmark",
      Object.assign({ id: id }, opts),
      "POST",
      folder.getBase()
    );
  }
}
class library extends base {
  static info = () =>
    new FetchURL(
      "item",
      "info",
      undefined,
      "GET",
      folder.getBase()
    ).callFetch();
  static history = () =>
    new FetchURL(
      "item",
      "history",
      undefined,
      "GET",
      folder.getBase()
    ).callFetch();
  /**
   * @param {String} libraryPath
   */
  static switch = (libraryPath) =>
    new FetchURL(
      "item",
      "switch",
      { libraryPath: libraryPath },
      "POST",
      folder.getBase()
    ).callFetch();
}

class EagleAPI extends base {
  static application = application;
  static folder = folder;
  static item = item;
  static library = library;
}

EagleAPI.application.getBase = () => EagleAPI.baseURL;
EagleAPI.folder.getBase = () => EagleAPI.baseURL;
EagleAPI.item.getBase = () => EagleAPI.baseURL;
EagleAPI.library.getBase = () => EagleAPI.baseURL;

export default EagleAPI;

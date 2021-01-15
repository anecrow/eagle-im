import fetch from "node-fetch";
import { paramStringify } from "./utils.js";

export default class FetchURL extends URL {
  static paramStringify = paramStringify;

  constructor(
    majorName,
    minorName,
    paramData = {},
    method = "GET",
    baseURL = "http://localhost:41595/api/"
  ) {
    super(`${baseURL}${majorName}/${minorName}`);
    this.majorName = majorName;
    this.minorName = minorName;
    this.requestOptions = { method: method };
    this.method = method;
    this.paramData = paramData;
  }

  get majorName() {
    return this.__PRIVATE_majorName;
  }
  set majorName(majorName) {
    let pathnames = this.pathname.split("/");
    pathnames[2] = majorName;
    this.pathname = pathnames.join("/");
    this.__PRIVATE_majorName = majorName;
  }
  get minorName() {
    return this.__PRIVATE_minorName;
  }
  set minorName(minorName) {
    let pathnames = this.pathname.split("/");
    pathnames[3] = minorName;
    this.pathname = pathnames.join("/");
    this.__PRIVATE_minorName = minorName;
  }
  get method() {
    return this.__PRIVATE_method ? this.__PRIVATE_method : "GET";
  }
  set method(method) {
    if (method == "GET") this.__setParamToURL();
    else if (method == "POST") this.__setParamToRequest();
    else throw new TypeError(method);
    this.requestOptions.method = method;
    this.__PRIVATE_method = method;
  }
  get paramData() {
    return this.__PRIVATE_paramData ? this.__PRIVATE_paramData : {};
  }
  set paramData(paramData = {}) {
    this.__PRIVATE_paramData = paramData;
    if (this.method == "GET") this.__setParamToURL();
    else if (this.method == "POST") this.__setParamToRequest();
  }

  __setParamToURL() {
    if ("body" in this.requestOptions) delete this.requestOptions.body;
    this.search = FetchURL.paramStringify(this.paramData);
  }
  __setParamToRequest() {
    this.search = "";
    this.requestOptions.body = JSON.stringify(this.paramData);
  }

  callFetch() {
    return fetch(this.href, this.requestOptions);
  }
  callFetchData() {
    return new Promise((resolve, reject) =>
      fetch(this.href, this.requestOptions)
        .then((response) => response.json())
        .then((json) => resolve(json.data))
        .catch((error) => reject(error))
    );
  }
}

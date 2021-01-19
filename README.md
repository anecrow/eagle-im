# API for **Eagle** image files management software

Build [API](https://api.eagle.cool/) for [Eagle](https://eagle.cool/) server with ES6.

**Note:** This package is not official. Let me know if there have issues and Welcome PR.

## Usage

You can install the package as follows:

```Powershell
npm install @anecrow/eagle-im --save
```

### common

Then import that module with:

```ES6
import EagleAPI from "@anecrow/eagle-im"

// call a repuest

EagleAPI.item.list({ limit: 2 })
  .then((x) => x.json())
  .then((x) => console.log(x.data));

// change Eagle server path in

EagleAPI.baseURL = "<api url host>" // default is"http://localhost:41595/api/"
```

### lower level

You may want a lower level function, to get fully control what you need to:

```ES6
import FetchURL from "@anecrow/eagle-im/lib/FetchURL.js";

// call the same repuest above

let apiURL = new FetchURL("item", "list",{ limit: 2 }); // return a extend URL object
apiURL.callFetchJson().then((x) => console.log(x.data));
```

there has 5 param in constructor:

```ES6
/**
 * @param {string} majorName - label of api type
 * @param {string} minorName - label of api function
 * @param {object} [paramData] - data of param object
 * @param {"GET"|"POST"} [method = "GET"] - type of request method
 * @param {string} [baseURL = "http://localhost:41595/api/"] - the api host
 */

// you can change api target anytime

apiURL.majorName = "item"
apiURL.minorName = "refreshPalette"
apiURL.paramData = {id:"KBKE02W8V0YWD"}
apiURL.method = "POST"
// FetchURL object sync update when those value change

// you shold change base api url with
apiURL.host
```

to get current api url

```ES6
currentURL = apiURL.href // 
```

then call request with this data

```ES6
apiURL.callFetch()

// it same as:

fetch("http://localhost:41595/api/item/refreshPalette", {
  method: "POST",
  body: JSON.stringify({id: "KBKE02W8V0YWD" })
});
```

there is a quick call to parse response json

```ES6
apiURL.callFetchJson().then((json) => console.log(json.data));
```

## License

MIT License

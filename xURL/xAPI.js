// @ts-check
import xURL from './xURL';
import { AbstractError, lowerCamelCase } from "./Utils";

/**
 * API路径类
 * @abstract 抽象类型
 * @implements {xAPIInterface}
 */
class APIPath extends xURL {
    /**
     * @abstract 抽象类型
     * @type {xURLConstructorType} 
     */
    constructor(url, base = undefined) {
        if (new.target === APIPath) throw new AbstractError()
        super(url, base)
        this.pathname_sub = this.endpoint
    }

    get endpoint() {
        let name = this.constructor.name
        return lowerCamelCase(name)
    }
}
/**
 * API节点类
 * @abstract 抽象类型
 * @implements {xAPIInterface}
 */
class APIEndPoint extends APIPath {
    /**
     * @abstract 抽象类型
     * @type {xURLConstructorType} 
     */
    constructor(url, base = undefined) {
        if (new.target === APIPath) throw new AbstractError()
        super(url, base)
    }

    get endpoint() {
        let name = this.constructor.name.split("_").pop()
        if (!name) throw "类名解析错误"
        return lowerCamelCase(name)
    }

    /** @type {FetchToDataType<object, object>} */
    fetchToData = async (params = undefined, method = "GET") => {
        /** @type {ResponseJson} */
        const json = await this.fetchToJson(params, method)
        if (json.status === "success" && json.data) return json.data
        else throw json
    }
}

export { APIPath, APIEndPoint }
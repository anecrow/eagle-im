// @ts-check
import xURLProxy from "./xURLProxy";
import { xURLSearchParams } from './xURLSearchParams';
import { AbstractError, lowerCamelCase } from "./Utils";

/* Part of URL components
 * 
 *  -href----------------------------------------------------------------
 * |                                                                     |
 * |-origin(read-only)---------------|                                   |
 * |                                 |                                   |
 * |             |-host--------------|                                   |
 * |             |                   |                                   |
 * |-protocol-|  |-hostname-| |-port-|--pathname-|-search--------|-hash--|
 * |          |  |          | |      |           |               |       |
 * |----------|--|----------|-|------|-----------|---------------|-------|
 * |  https:   //  site.com  :  8080  /path /page ?p1=v1&p2=v2...  #hash |
 * |---------------------------------|-----|-----|-----------------------|
 * |              /------------------      |      -------\               |
 * |             |-(read-only)pathname-sup-|-pathname-sub-|              |
 *  -xURL----------------------------------------------------------------
 * 
 * [URL objects](https://javascript.info/url)
 * [URL - Web APIs](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)
 */

/**
 * URL扩展基类
 * @abstract 抽象类型
 * @implements {xURLInterface}
 */
class xURLBase extends xURLProxy {
    /** 
     * @abstract 抽象类型
     * @type {xURLConstructorType} 
     */
    constructor(url, base = undefined) {
        if (new.target === xURLBase) throw new AbstractError()
        super(url, base)
        /** 
         * @protected 
         * @readonly
         * @type {string}
         */
        this[this.$pathname_sub] = ""
    }

    /** 
     * @protected 
     * @readonly
     */
    $pathname_sub = Symbol("pathname_sub")

    /** @readonly */
    searchParams = new xURLSearchParams()

    /**
     * @abstract 抽象类型
     * @readonly
     * @type {string} 
     */
    get pathname_sup() { return "" }
    /**
     * @abstract 抽象类型
     * @type {string} 
     */
    get pathname_sub() { return "" }
    /** 
     * @abstract 抽象类型
     * @param {string} value 
     */
    set pathname_sub(value) { }
    /**
     * @abstract 抽象类型
     * @protected 
     * @type {PathnameCheckType} 
     */
    pathnameCheck

    /** 
     * @abstract 抽象类型
     * @type {FetchType<object>} 
     */
    fetch
    /** 
     * @abstract 抽象类型
     * @type {FetchToJsonType<object, object>} 
     */
    fetchToJson
    /** 
     * @abstract 抽象类型
     * @type {()=>void} 
     */
    update
}

/**
 * URL扩展
 * @implements {xURLBase}
 * @template {xURL} T
 * @example
 * // 扩展原生 searchParams 属性
 * // 新增assign方法允许直接使用对象键值填充内容
 * searchParams.assign(data: object)
 * // 扩展原生 pathname 属性
 * pathname = pathname_sup + pathname_sub
 * // 新增 fetch fetchToJson 方法
 * // 可以对当前URL发起请求
 */
class xURL extends xURLBase {
    /** @type {xURLConstructorType} */
    constructor(url, base = undefined) {
        super(url, base)
        /** @type {ProxyHandler<T>} */
        this.proxyHandler = {
            set(target, prop, value) {
                try {
                    target[prop] = value
                    target.pathnameCheck() // 新增处理
                    target.update() // 新增处理
                    return true
                } catch (error) {
                    console.error(error)
                    return false
                }
            }
        }
    }

    /**
     * @readonly
     * @type {string} 
     */
    get pathname_sup() {
        const reg = new RegExp(this.pathname_sub + "$")
        return this.pathname.replace(reg, "")
    }
    /** @type {string} */
    get pathname_sub() { return this[this.$pathname_sub] }
    set pathname_sub(value) {
        if (value !== "" && value[0] !== "/") value = "/" + value // 自动斜杠
        // 清理旧路径
        this.pathname = this.pathname_sup
        // 设置新路径
        this[this.$pathname_sub] = value
        this.pathname += this[this.$pathname_sub]
    }
    /**
     * @protected 
     * @type {PathnameCheckType} 
     */
    pathnameCheck = () => {
        if (this.pathname === (this.pathname_sup + this.pathname_sub)) return true
        // pathname 改变时清空 pathname_sub
        this.pathname_sub = ""
        return false
    }

    /** 
     * @type {FetchType<object>} 
     * @param params 参数对象
     * @param method 请求类型
     * @example
     * // 自动将参数插入对应位置
     * params = {
     *   a:123,
     *   b:"text"
     * }
     * // GET: 将参数插入url search字段
     * method = "GET" 
     * fetch("http://web.com/page?a=123&b=text")
     * // PUSH: 将参数插入body字段
     * method = "PUSH"
     * fetch(
     *   "http://web.com/page",
     *   {
     *     body:'{"a":123,"b":"text"}',
     *     method:"PUSH"
     *   }
     * )
     * @example
     * // 当条件为真
     * // 参数 params 与 method 会失去作用
     * opt && opt.method && !["GET", "PUSH"].includes(opt.method)
     * // requestInit 由 opt 提供
     * fetch(this, opt)
     */
    fetch = async (params = undefined, method = "GET", opt = undefined) => {
        const url = new xURL(this)

        // 优先短路
        const shortCase = opt && opt.method && !["GET", "PUSH"].includes(opt.method)
        if (shortCase) return await fetch(url, opt)

        // 常规逻辑
        if (!["GET", "PUSH"].includes(method)) throw `不被支持的方法: {${method}}`
        /** @type {RequestInit} */
        const init = { method: method }
        // 将参数内容插入对应位置
        if (params && Object.keys(params).length !== 0) {
            if (method === "GET") url.searchParams.assign(params)
            if (method === "PUSH") init.body = JSON.stringify(params)
        }
        // 合并额外请求参数
        if (opt) Object.assign(init, opt)

        return await fetch(url, init)
    }
    /** @type {FetchToJsonType<object, object>} */
    fetchToJson = async (params = undefined, method = "GET") => await (await this.fetch(params, method)).json()
}

export default xURL
// @ts-check
import { AbstractError } from "./Utils";

/** 
 * URL代理基类
 * @abstract 抽象类型
 * @implements {xURLProxyInterface}
 * @template {xURLProxyBase} T
 */
class xURLProxyBase extends URL {
    static assign = assignProxyHandler
    /** 
     * @abstract 抽象类型
     * @type {xURLProxyConstructorType} 
     * @this {xURLProxyBase}
     */
    constructor(url, base = undefined) {
        if (new.target === xURLProxyBase) throw new AbstractError()
        super(url, base)
        /** 
         * @protected 
         * @readonly
         * @type {ProxyHandler<T>}
         */
        this[this.$ProxyHandler] = {}
        // return new Proxy(this, this.proxyHandler)
    }

    /** 
     * @protected 
     * @readonly
     */
    $ProxyHandler = Symbol("ProxyHandler")

    /** @type {ProxyHandler<T>} */
    get proxyHandler() { return {} }
    /** @param {ProxyHandler<T>} value */
    set proxyHandler(value) { }
}

/** 
 * @template {{}} T
 * @type {AssignProxyHandlerType<T>} 
 */
function assignProxyHandler(target, ...source) {
    /** @type {ProxyHandler} */
    const data = Object.assign({}, ...source)
    for (const [k, v] of Object.entries(data)) {
        if (v) target[k] = v // 新属性不为undefined -- 增添|修改 属性
        else if (k in target) { // 新属性为undefined, 存在旧属性 -- 删除属性
            // 不允许删除 {get, set} 拦截器
            if (!["get", "set"].includes(k)) delete target[k]
        }
    }
    return target
}

/** 
 * URL代理
 * @implements {xURLProxyInterface}
 * @template {xURLProxy} T
 * @example
 * // 将原生 URL对象 转化为 Proxy<URL>对象 
 * // 代理对象通过定义的拦截器规则触发处理操作
 * @example
 * // 拦截器容器可以通过 proxyHandler属性 进行操作 
 * this.proxyHandler
 * // 实现了 getter setter
 * this.proxyHandler = {
 *   has: (...args)=>{...},
 *   get: ()=>{...},
 *   set: undefined
 * }
 * // setter 会处理赋值操作符
 * @example
 * // 原有拦截器
 * this.proxyHandler: {
 *   set(...args){...},
 *   get(){}
 * }
 * // 修改拦截器
 * new xURLProxy(url, base, handler = {
 *   has(...args){...}, // 新属性不为undefined, 不存在旧属性 -- 增添属性
 *   get(){return true}, // 新属性不为undefined, 存在旧属性 -- 修改属性
 *   set: undefined // 新属性为undefined, 存在旧属性 -- 删除属性
 * })
 * // 或使用赋值操作符
 * this.proxyHandler = {...}
 * // 更新后拦截器
 * {
 *   set(...args){...}, // 不允许删除 {get, set} 拦截器, 否则会导致实例属性对应操作非法
 *   get(){return true},
 *   has(...args){...}
 * }
 */
class xURLProxy extends xURLProxyBase {
    /** 
     * 返回受控的URL代理对象
     * @type {xURLProxyConstructorType} 
     * @this {xURLProxy}
     */
    constructor(url, base = undefined) {
        super(url, base)
        /** @type {xProxyHandler<T>} */
        const defaultHandler = {
            set(target, prop, value) {
                try {
                    target[prop] = value
                    return true // set拦截器 需要返回 Boolean 值表示操作成功与否
                } catch (error) {
                    console.error(error)
                    return false
                }
            },
            get(target, prop) { return target[prop] }
        }
        this.proxyHandler = defaultHandler
        return new Proxy(this, this.proxyHandler)
    }

    /** @return {ProxyHandler<T>} */
    get proxyHandler() { return this[this.$ProxyHandler] }
    /** @param {ProxyHandler<T>} value */
    set proxyHandler(value) { xURLProxy.assign(this[this.$ProxyHandler], value) }
}

export default xURLProxy
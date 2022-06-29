// @ts-check

/**
 * URLSearchParams扩展类
 * @implements {xURLSearchParamsType}
 */
class xURLSearchParams extends URLSearchParams {
    /**
     * 合并对象至searchParams
     * @param  {...object} source 
     */
    assign(...source) {
        const target = Object.assign({}, ...source)
        if (Object.keys(target).length > 0) {
            for (const [key, value] of Object.entries(target)) {
                this.append(key, value)
            }
        }
    }
}

export {xURLSearchParams}
// @ts-check

class AbstractError extends Error {
    constructor(msg = "抽象类型不允许被实例化") {
        super(msg)
    }
    name = "AbstractError"
}

/** @param {string} string */
function lowerCamelCase(string) {
    let letters = [...string]
    letters[0] = letters[0].toLowerCase()
    return letters.join("")
}

export { AbstractError, lowerCamelCase }
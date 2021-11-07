const converterList:Map<string, any> = new Map()

const converter:Kensho.Converter = {
  /**
   * 
   */
  add(name, converter) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)
    if (typeof converter !== 'function') throw new Error(`The argument "converter" must be a function.`)
    
    if (converterList.get(name)) throw new Error(`The "${name}" converter already exist.`)
    converterList.set(name, converter)
  },
  /**
   * 
   */
  remove(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    if (!converterList.get(name)) throw new Error(`The "${name}" converter isn't existed.`)
    converterList.delete(name)
  },
  /**
   * 
   */
  get(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    const converter = converterList.get(name)
    if (converter === undefined) throw new Error(`The "${name}" converter isn't found.`)
    return converter
  }
}

export default converter
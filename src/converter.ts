const converterBox:Map<string, any> = new Map()

const converter:Kensho.Converter = {
  /**
   * 
   */
  add(name, converter) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)
    if (typeof converter !== 'function') throw new Error(`The argument "converter" must be a function.`)
    
    if (converterBox.get(name)) throw new Error(`The "${name}" converter already exist.`)
    converterBox.set(name, converter)
  },
  /**
   * 
   */
  remove(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    if (!converterBox.get(name)) throw new Error(`The "${name}" converter isn't existed.`)
    converterBox.delete(name)
  },
  /**
   * 
   */
  get(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    const converter = converterBox.get(name)
    if (converter === undefined) throw new Error(`The "${name}" converter isn't found.`)
    return converter
  },
  /**
   * 
   */
  import(collection:Kensho.ConverterBox){
    Object.entries(collection).forEach(([name, converter]) => this.add(name, converter))
  }
}

export default converter
export const ruleBook:Map<string, any> = new Map()

const rule:Kensho.Rule = {
  /**
   * 
   */
  add(name, rule) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)
    if (typeof rule !== 'function') throw new Error(`The argument "rule" must be a function.`)
    
    if (ruleBook.get(name)) throw new Error(`The "${name}" rule already exist.`)
    ruleBook.set(name, rule)
  },
  /**
   * 
   */
  remove(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    if (!ruleBook.get(name)) throw new Error(`The "${name}" rule isn't existed.`)
    ruleBook.delete(name)
  },
  /**
   * 
   */
  get(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    const rule = ruleBook.get(name)
    if (rule === undefined) throw new Error(`The "${name}" rule isn't found.`)
    return rule
  }
}

export default rule
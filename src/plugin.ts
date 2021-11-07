const pluginBox:Map<string, any> = new Map()

const plugin:Kensho.Plugin = {
  /**
   *
   */
  add(name, plugin) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)
    if (typeof plugin !== 'function') throw new Error(`The argument "plugin" must be a function.`)
    
    if (pluginBox.get(name)) throw new Error(`The "${name}" plugin already exist.`)
    pluginBox.set(name, plugin)
  },
  /**
   *
   */
  remove (name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    if (!pluginBox.get(name)) throw new Error(`The "${name}" plugin isn't existed.`)
    pluginBox.delete(name)
  },
  /**
   * 
   */
  get(name) {
    if (typeof name !== 'string') throw new Error(`The argument "name" must be a string.`)
    if (name === '') throw new Error(`Empty string are not accepted.`)

    const rule = pluginBox.get(name)
    if (rule === undefined) throw new Error(`The "${name}" plugin isn't found.`)
    return rule
  },
  /**
   * 
   */
  use(name) {
  }
}
export default plugin

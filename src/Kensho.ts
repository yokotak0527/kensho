import rule      from './rule'
import converter from './converter'

const Kensho:Kensho = {
  /**
   * 
   */
  config : {
    validate : {
      throughEmptyString : false,
      throughNull        : false,
      throughUndefined   : false,
      throughNaN         : false
    }
  },
  /**
   * 
   */
  rule : rule,
  /**
   * 
   */
  converter : converter,
  /**
   * 
   */
  convert(names, value) {
    if (typeof names === 'string') {
      return Kensho.converter.get(names)(value)
    } else {
      names.forEach(name => {
        value = Kensho.converter.get(name)(value)
      })
      return value
    }
  },
  /**
   * 
   */
  validate(name, value, ruleOption, option = {}) {
    /** rule function */
    const rule = Kensho.rule.get(name)

    const fixOption = Object.assign({}, Kensho.config.validate, option) as Kensho.ValidateOptions
    
    if (typeof value === 'string' && fixOption.throughEmptyString) return true
    if (value === null &&  fixOption.throughNull) return true
    if (value === undefined && fixOption.throughUndefined) return true
    if (Number.isNaN(value) && fixOption.throughNaN) return true
    
    return rule(value, ruleOption)
  }
}

export default Kensho
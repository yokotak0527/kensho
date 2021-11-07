import rule      from './rule'
import plugin    from './plugin'
import converter from './converter'

type RuleBook = Kensho.RuleBook
class Kensho {
  /** rule controller */
  static rule = rule
  /** plugin controller */
  static plugin = plugin
  /** converter controller */
  static converter = converter
  /**
   * EN : validate the value.  
   * JP : 値を検証する。
   */
  // static validate<N extends string = keyof RuleBook>(
  //   ruleName    : N,
  //   value       : N extends keyof RuleBook ? Parameters<RuleBook[N]>[0] : any,
  //   ruleOption? : N extends keyof RuleBook ? Parameters<RuleBook[N]>[1] : any
  // ):boolean {
  //   const rule = this.rule.get(ruleName)

  //   const result = rule(value, ruleOption)
  //   return result
  // }
  /**
   * EN : convert the value.  
   * JP : 値を変換する。
   */
  // static convert(value:any, converter:string|string[]) {
  //   // if(typeof converter === 'string') converter = [converter]
  //   // converter.forEach(name => {
  //   //   value = this.converter.get(name)(value)
  //   // })
  //   const validate = this.validate
  //   return {
  //     ...this,
  //     validate : <N extends string = keyof RuleBook>(
  //       ruleName    : N,
  //       ruleOption? : N extends keyof RuleBook ? Parameters<RuleBook[N]>[1] : any
  //     )=> validate(ruleName, value, ruleOption)
  //   }
  // }
  // static convert(value:any, convertor){
  //   return {
  //     validate(){
  //       this.validate()
  //     }
  //   }
  // }
  /**
   * 
   */
  constructor () {
  }
}

export default Kensho
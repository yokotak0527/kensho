import rule      from './rule'
import plugin    from './plugin'
import converter from './converter'

// type alias
type RuleBook      = Kensho.RuleBook
type ConverterList = Kensho.ConverterList

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
   * EN : Use a converter to convert the value.  
   *      it can be multiple specified.  
   *      You can use generics to specify the input and output types
   *      (I = input, O = output), but also you can infer them by passing an
   *      array of converters as the `const`.
   *      (if the definition of the converter is extended).  
   * ---------------------------------------------------------------------------
   * JP : コンバータを使用して値を変換します。  
   *     コンバータは複数指定出来ます。  
   *      generics を使って入力と出力の型を指定することもできますが
   *      (I = 入力, O = 出力) コンバータの配列を `const` として渡すことで推論す
   *      ることもできます。
   *      (コンバータの定義が拡張されている場合に限る)
   */
  static convert<I = any, O = any, L extends readonly string[] = string[]>(
    converter:L,
    value : L extends readonly [infer A, ...(keyof ConverterList)[]] ? A extends (keyof ConverterList) ? Parameters<ConverterList[A]>[0] : I : I
  ){
    converter.forEach(name => {
      value = this.converter.get(name)(value)
    })
    return value as unknown as L extends readonly [...(keyof ConverterList)[], infer B] ? B extends (keyof ConverterList) ? ReturnType<ConverterList[B]> : O : O
  }
  /**
   * 
   */
  constructor () {
  }
}

export default Kensho
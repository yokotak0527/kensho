type Converter    = Kensho.Converter
type ConverterBox = Kensho.ConverterBox
type Rule         = Kensho.Rule
type RuleBook     = Kensho.RuleBook

declare namespace Kensho {
  interface ValidateOptions {
    /**
     * Returns `true` if the value is empty string before validating it. default `false`
     */
    throughEmptyString: boolean
    /**
     * Returns `true` if the value is null before validating it. default `false`
     */
    throughNull: boolean
    /**
     * Returns `true` if the value is undefined before validating it. default `false`
     */
    throughUndefined: boolean
    /**
     * Returns `true` if the value is undefined before validating it. default `false`
     */
    throughNaN: boolean
  }
}

declare interface KenshoInterface {
  /**
   * global config.
   */
  config: {
    validate: Kensho.ValidateOptions
  },
  /**
   * rule controller
   */
  rule: Rule
  /**
   * converter controller
   */
  converter: Converter
  /**
   * EN : Use a converter to convert the value.  
   *      You can also specify multiple converters by passing an array.  
   *      You can use generics to specify the input and output types
   *      (I = input, O = output), but also you can infer them by passing an
   *      array of converters as the `const`.
   *      (if the definition of the converter is extended).  
   * ---------------------------------------------------------------------------
   * JP : コンバータを使用して値を変換します。  
   *      配列を渡すことで、コンバータを複数指定することも出来ます。  
   *      generics を使って入力と出力の型を指定することもできますが
   *      (I = 入力, O = 出力) コンバータの配列を `const` として渡すことで推論す
   *      ることもできます。
   *      (コンバータの定義が拡張されている場合に限る)
   */
  convert<I = any, O = any, C extends string | readonly string[] = string>(
    names : C,
    value : C extends keyof ConverterBox ? ConverterBox[C] extends (...args:infer _A)=>any ? _A[0] : I
          : C extends readonly [infer _A, ...string[]] ? _A extends (keyof ConverterBox) ? Parameters<ConverterBox[_A]>[0] : I : I
  ): C extends keyof ConverterBox ? ConverterBox[C] extends (...args:any)=>infer _B ? _B : O
   : C extends readonly [...string[], infer _A] ? _A extends (keyof ConverterBox) ? ReturnType<ConverterBox[_A]> : O : O
  /**
   * EN : validate the value.  
   * JP : 値を検証する。
   */
  validate<N extends string = keyof RuleBook>(
    name        : N,
    value       : N extends keyof RuleBook ? Parameters<RuleBook[N]>[0] : any,
    ruleOption? : N extends keyof RuleBook ? Parameters<RuleBook[N]>[1] extends undefined ? undefined : Parameters<RuleBook[N]>[1] : any,
    option?     : Partial<Kensho.ValidateOptions>
  ): boolean
}

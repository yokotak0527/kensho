/// <reference types="./@types/Kensho.Plugin" />
/// <reference types="./@types/Kensho.Rule" />
/// <reference types="./@types/Kensho.Converter" />
/// <reference types="./@types/utils" />

// import Kensho from './src/Kensho'
// export default Kensho

// type alias
type Rule                              = Kensho.Rule
type RuleBook                          = Kensho.RuleBook
type Converter                         = Kensho.Converter
type ConverterList                     = Kensho.ConverterList
type GetTupleLastItem<T extends any[]> = Kensho.utils.getTupleLastItem<T>

export default class Kensho {
  /**
   * 
   */
  static rule:Rule
  /**
   * 
   */
  static plugin:Kensho.Rule
  /**
   * 
   */
  static converter:Converter
  /**
   * 
   */
  static validate<N extends string = keyof RuleBook>(
    ruleName    : N,
    value       : N extends keyof RuleBook ? Parameters<RuleBook[N]>[0] : any,
    ruleOption? : N extends keyof RuleBook ? Parameters<RuleBook[N]>[1] : any
  ):boolean
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
  ): L extends readonly [...(keyof ConverterList)[], infer B] ? B extends (keyof ConverterList) ? ReturnType<ConverterList[B]> : O : O
  /**
   * EN : add rule book module  
   * JP : ルールブックモジュールを追加する
   */
  static book(ruleBook:RuleBook):void
  /**
   * 
   */
  constructor()
}
declare module Kensho {
  /**
   * 
   */
  type DefaultConverterFunction = (value:any, option?:any)=>any
  /**
   * EN : The converters key value store.  
   * `{ CONVERTER-NAME : CONVERTER-FUNCTION }`  
   * If you want to add your converter, extend this with your `*.d.ts` file.  
   * ---------------------------------------------------------------------------
   * JP : コンバータのキーバリューストア。  
   * `{ CONVERTER-NAME : CONVERTER-FUNCTION }`  
   * コンバータを追加したい場合は、`*.d.ts` ファイルで拡張してください。
   */
  interface ConverterList {
    "noop" : (value:any, option?:{})=>undefined
  }
  interface Converter {
    /**
     * EN : Add the converter.
     *      If same name converter already exists, this will throw an exception.  
     * -------------------------------------------------------------------------
     * JP : コンバータを追加します。  
     *      同じ名前のコンバータが既に存在する場合、例外を投げます。
     */
    add<N extends string = keyof ConverterList>(name:N, converter:N extends keyof ConverterList ? ConverterList[N] : DefaultConverterFunction):void
    /**
     * EN : Remove the converter.
     *      If there isn't the specified name converter, this will throw an exception.  
     * -------------------------------------------------------------------------
     * JP : コンバータを削除します。
     *      指定された名前のコンバータが存在しない場合、例外を投げます。
     */
    remove<N extends string = keyof ConverterList>(name:N):void
    /**
     * EN : Get the converter function.
     *      If there isn't the specified name converter, this will throw an exception.  
     * -------------------------------------------------------------------------
     * JP : コンバータを取得します。
     *     指定された名前のコンバータが存在しない場合、例外を投げます。
     */
    get<N extends string = keyof ConverterList>(name:N): N extends keyof ConverterList ? ConverterList[N] : DefaultConverterFunction
  }
}
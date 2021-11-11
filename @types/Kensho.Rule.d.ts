declare namespace Kensho {
  /**
   * 
   */
  type DefaultRuleFunction = (value:any, option?:any)=>boolean
  /**
   * EN : The rules key value store.`{ RULE-NAME : RULE-FUNCTION }`  
   * If you want to add your rules, extend this with your `*.d.ts` file.  
   * ---------------------------------------------------------------------------
   * JP : ルールのキーバリューストア。`{ RULE-NAME : RULE-FUNCTION }`  
   * ルールを追加したい場合は、`*.d.ts` ファイルで拡張してください。
   */
  interface RuleBook {}
  /**
   * 
   */
  interface Rule {
    /**
     * EN : Add the rule.
     *      If same name rule already exists, this will throw an exception.  
     * -------------------------------------------------------------------------
     * JP : ルールを追加します。  
     *      同じ名前のルールが既に存在する場合、例外を投げます。
     */
    add<N extends string = keyof RuleBook>(name:N, rule:N extends keyof RuleBook ? RuleBook[N] : DefaultRuleFunction):void
    /**
     * EN : Remove the rule.
     *      If there isn't the specified name rule, this will throw an exception.  
     * -------------------------------------------------------------------------
     * JP : ルールを削除します。
     *      指定された名前のルールが存在しない場合、例外を投げます。
     */
    remove<N extends string = keyof RuleBook>(name:N):void
    /**
     * EN : Get the rule function.
     *      If there isn't the specified name rule, this will throw an exception.  
     * -------------------------------------------------------------------------
     * JP : ルールを取得します。
     *     指定された名前のルールが存在しない場合、例外を投げます。
     */
    get<N extends string = keyof RuleBook>(name:N): N extends keyof RuleBook ? RuleBook[N] : DefaultRuleFunction
    /**
     * EN : Add an external rulebook.  
     * JP : 外部のルールブックを追加する。
     */
    import(book:Kensho.RuleBook):void
  }
}
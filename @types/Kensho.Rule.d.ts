declare module Kensho {
  /**
   * 
   */
  type DefaultRuleFunction = (value:any, option?:any)=>boolean
  /**
   * The rules key value store.  
   * This store keys are rule name, values are rule function.  
   * If you want to add your rules, extend this with d.ts file.
   */
  interface RuleBook {}
  /**
   * 
   */
  interface Rule {
    /**
     * Add the rule.
     * If same name rule already exists, this will throw an exception.
     */
    add<N extends string = keyof RuleBook, M = N extends keyof RuleBook ? RuleBook[N] : DefaultRuleFunction>(name:N, rule:M):void
    /**
     * Remove the rule.
     * If there isn't the specified name rule, this will throw an exception.
     */
    remove<N extends string = keyof RuleBook>(name:N):void
    /**
     * Get the rule function.
     * If there isn't the specified name rule, this will throw an exception.
     */
    get<N extends string = keyof RuleBook, R = N extends keyof RuleBook ? RuleBook[N] : DefaultRuleFunction>(name:N): R
  }
}
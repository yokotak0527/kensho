declare module Kensho {
  /**
   * 
   */
  type DefaultPluginFunction = ()=>boolean
  /**
   * The plugins key value store.  
   * This store keys are plugin name, values are plugin function.  
   * If you want to add your plugins, extend this with d.ts file.
   */
  interface PluginList {}
  /**
   * 
   */
  interface Plugin {
    /**
     * Add the plugin.
     * If same name plugin already exists, this will throw an exception.
     */
    add<N extends string = keyof PluginList, P = N extends keyof PluginList ? PluginList[N] : DefaultPluginFunction>(name:N, plugin:P):void
     /**
      * Remove the plugin.
      * If there isn't the specified name plugin, this will throw an exception.
      */
    remove<N extends string = keyof PluginList>(name:N):void
    /**
     * Get the plugin function.
     * If there isn't the specified name plugin, this will throw an exception.
     */
    get<N extends string = keyof PluginList>(name:N):void
    /**
     * Use the plguin.
     */
    use<N extends string = keyof PluginList>(name:N):void
  }
}
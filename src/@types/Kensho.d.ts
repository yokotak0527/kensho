declare namespace Kensho { // eslint-disable-line
  interface Config {
    customAttrPrefix    : string,
    errorMessageWrapper : string,
    verbose             : boolean,
    errorClassName      : string,
    autocomplete        : boolean,
    HTML5novalidate     : boolean
  }
  type InputElementTypes = HTMLInputElement | HTMLSelectElement

  interface RuleUnitElements {
    [name:string] : { input : Kensho.InputElementTypes, error? : HTMLElement }
  }

  interface RuleUnit {
    inputElement  : InputElementTypes[]
    rule          : Array<[ string, { [ x : string ] : any } ]>
    errorMessage? : {[ruleName:string]:string}
    errorElement? : HTMLElement
    error         : string[]
    displayError  : boolean
    event         : string[]
    name          : string
    tagName       : string
    type          : string
    valueFilter?  : Kensho.AnyFunction
  }
}
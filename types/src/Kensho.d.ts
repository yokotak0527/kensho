import { RuleStore, RuleType } from './rule';
import { PluginStore } from './plugin';
interface CustomAttrSearchResult {
    [name: string]: {
        input: HTMLInputElement;
        error?: HTMLElement;
    };
}
declare type _F = (...args: any) => any;
export interface InputRuleUnitType {
    inputElement: HTMLInputElement[];
    rule: Array<[string, {
        [x: string]: any;
    }]>;
    errorMessage: {
        [ruleName: string]: string;
    } | undefined;
    errorElement: HTMLElement | undefined;
    error: string[];
    displayError: boolean;
    event: string[];
    name: string;
    tagName: string;
    type: string;
    valueFilter: Function | undefined;
}
export declare class Kensho {
    form: HTMLElement;
    private readonly inputsRules;
    static config: {
        customAttrPrefix: string;
        errorMessageWrapper: string;
        verbose: boolean;
        errorClassName: string;
        autocomplete: boolean;
        HTML5novalidate: boolean;
    };
    static rule: {
        add<V, O extends Object = undefined, K extends typeof Kensho = undefined>(name: string, callback: K extends undefined ? O extends undefined ? (value: V) => boolean : (value: V, option: O) => boolean : RuleType<V, O, K>): void;
        get<N extends string, S extends RuleStore = RuleStore>(name: N): N extends keyof S ? S[N] : (value: any, option?: Object, Kensho?: typeof Kensho) => boolean;
        delete(name: string): void;
    };
    static plugin: {
        [x: string]: any;
        add<F extends Function>(name: string, method: F): void;
        get<N extends string, S extends PluginStore = PluginStore>(name: N): N extends keyof S ? S[N] : Function;
        delete(name: string): void;
    };
    static validate<N extends string, S extends RuleStore = RuleStore, F = N extends keyof S ? S[N] : _F, A extends any[] = F extends _F ? Parameters<F> : never>(rulename: N, value: A[0], option: A[1]): boolean;
    static validate<N extends string, S extends RuleStore = RuleStore, F = N extends keyof S ? S[N] : _F, A extends any[] = F extends _F ? Parameters<F> : never>(rulename: N, value: A[0]): boolean;
    static use<N extends string, S extends PluginStore = PluginStore, F = N extends keyof S ? S[N] : _F>(pluginName: N, ...args: F extends _F ? Parameters<F> : never): F extends _F ? ReturnType<F> : never;
    constructor(formSelector: string | HTMLElement);
    search(): CustomAttrSearchResult;
    add(param: {
        inputElement: string | HTMLInputElement | NodeListOf<HTMLInputElement> | HTMLInputElement[];
        rule: string | Array<string | [string, {
            [x: string]: any;
        }]>;
        errorMessage?: string | {
            [ruleName: string]: string;
        };
        errorElement?: string | HTMLElement;
        event?: string | string[];
        name?: string;
        valueFilter?: Function | undefined;
    }): InputRuleUnitType;
    getRuleUnit(ruleUnitName: string): InputRuleUnitType;
    getInputValue(unit: InputRuleUnitType): string;
    clear(unit: InputRuleUnitType): void;
    validate(ruleUnitName: string): boolean;
    displayError(unit: InputRuleUnitType): void;
}
export {};

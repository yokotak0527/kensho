(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Kensho = factory());
})(this, (function () { 'use strict';

    const ruleBook = new Map();
    const rule = {
        add(name, rule) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            if (typeof rule !== 'function')
                throw new Error(`The argument "rule" must be a function.`);
            if (ruleBook.get(name))
                throw new Error(`The "${name}" rule already exist.`);
            ruleBook.set(name, rule);
        },
        remove(name) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            if (!ruleBook.get(name))
                throw new Error(`The "${name}" rule isn't existed.`);
            ruleBook.delete(name);
        },
        get(name) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            const rule = ruleBook.get(name);
            if (rule === undefined)
                throw new Error(`The "${name}" rule isn't found.`);
            return rule;
        },
        import(ruleBook) {
            Object.entries(ruleBook).forEach(([name, rule]) => this.add(name, rule));
        }
    };

    const converterBox = new Map();
    const converter = {
        add(name, converter) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            if (typeof converter !== 'function')
                throw new Error(`The argument "converter" must be a function.`);
            if (converterBox.get(name))
                throw new Error(`The "${name}" converter already exist.`);
            converterBox.set(name, converter);
        },
        remove(name) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            if (!converterBox.get(name))
                throw new Error(`The "${name}" converter isn't existed.`);
            converterBox.delete(name);
        },
        get(name) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            const converter = converterBox.get(name);
            if (converter === undefined)
                throw new Error(`The "${name}" converter isn't found.`);
            return converter;
        },
        import(collection) {
            Object.entries(collection).forEach(([name, converter]) => this.add(name, converter));
        }
    };

    const Kensho = {
        config: {
            validate: {
                throughEmptyString: false,
                throughNull: false,
                throughUndefined: false,
                throughNaN: false
            }
        },
        rule: rule,
        converter: converter,
        convert(names, value) {
            if (typeof names === 'string') {
                return Kensho.converter.get(names)(value);
            }
            else {
                names.forEach(name => {
                    value = Kensho.converter.get(name)(value);
                });
                return value;
            }
        },
        validate(name, value, ruleOption, option = {}) {
            const rule = Kensho.rule.get(name);
            const fixOption = Object.assign({}, Kensho.config.validate, option);
            if (typeof value === 'string' && fixOption.throughEmptyString)
                return true;
            if (value === null && fixOption.throughNull)
                return true;
            if (value === undefined && fixOption.throughUndefined)
                return true;
            if (Number.isNaN(value) && fixOption.throughNaN)
                return true;
            return rule(value, ruleOption);
        }
    };

    return Kensho;

}));
//# sourceMappingURL=bundle.umd.js.map

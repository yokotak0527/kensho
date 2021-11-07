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
        }
    };

    const pluginBox = new Map();
    const plugin = {
        add(name, plugin) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            if (typeof plugin !== 'function')
                throw new Error(`The argument "plugin" must be a function.`);
            if (pluginBox.get(name))
                throw new Error(`The "${name}" plugin already exist.`);
            pluginBox.set(name, plugin);
        },
        remove(name) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            if (!pluginBox.get(name))
                throw new Error(`The "${name}" plugin isn't existed.`);
            pluginBox.delete(name);
        },
        get(name) {
            if (typeof name !== 'string')
                throw new Error(`The argument "name" must be a string.`);
            if (name === '')
                throw new Error(`Empty string are not accepted.`);
            const rule = pluginBox.get(name);
            if (rule === undefined)
                throw new Error(`The "${name}" plugin isn't found.`);
            return rule;
        },
        use(name) {
        }
    };

    class Kensho {
        static rule = rule;
        static plugin = plugin;
        constructor() {
        }
    }

    return Kensho;

}));
//# sourceMappingURL=bundle.umd.js.map

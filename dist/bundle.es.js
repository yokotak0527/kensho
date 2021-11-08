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
    book(ruleBook) {
        Object.entries(ruleBook).forEach(([name, rule]) => this.add(name, rule));
    },
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

const converterList = new Map();
const converter = {
    add(name, converter) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        if (typeof converter !== 'function')
            throw new Error(`The argument "converter" must be a function.`);
        if (converterList.get(name))
            throw new Error(`The "${name}" converter already exist.`);
        converterList.set(name, converter);
    },
    remove(name) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        if (!converterList.get(name))
            throw new Error(`The "${name}" converter isn't existed.`);
        converterList.delete(name);
    },
    get(name) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        const converter = converterList.get(name);
        if (converter === undefined)
            throw new Error(`The "${name}" converter isn't found.`);
        return converter;
    }
};

class Kensho {
    static rule = rule;
    static plugin = plugin;
    static converter = converter;
    static validate(ruleName, value, ruleOption) {
        const rule = this.rule.get(ruleName);
        const result = rule(value, ruleOption);
        return result;
    }
    static convert(value, converter) {
        if (typeof converter === 'string')
            converter = [converter];
        converter.forEach(name => {
            value = this.converter.get(name)(value);
        });
        const validate = this.validate;
        return {
            ...this,
            validate: (ruleName, ruleOption) => validate(ruleName, value, ruleOption)
        };
    }
    constructor() {
    }
}

export { Kensho as default };
//# sourceMappingURL=bundle.es.js.map

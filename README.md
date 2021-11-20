# Kensho

![NPM Download](https://img.shields.io/npm/dt/@yokotak0527/kensho)
![TravisCI](https://travis-ci.org/yokotak0527/kensho.svg?branch=master)
![open issue](https://img.shields.io/github/issues/yokotak0527/kensho)
![MIT licence](https://img.shields.io/github/license/yokotak0527/kensho)

The JavaScript validation package.

This plugin can't validate form values. If you want to it, use [Kensho-form](https://www.npmjs.com/package/@yokotak0527/kensho-form).

**Note** :  
Destructive changes have been made since version 2.X. It is not compatible. If you need an older version, please use [Kensho-legacy](https://www.npmjs.com/package/@yokotak0527/kensho-legacy). 🙇‍♂️

This package works with the rule that validates values and the converter that converts values before validating them.  
They are not included in this package, so you will need to import them from outside to actually validate the values.  
How to import and create it is explained below. There is also a generic rule and converter available as a separate module, if you want to use it.

- [kensho-rulebook-default](https://www.npmjs.com/package/@yokotak0527/kensho-rulebook-default)
- [kensho-convbox-default](https://www.npmjs.com/package/@yokotak0527/kensho-convbox-default)

# Install

```bash
$ npm i @yokotak0527/kensho
```

# Setup

```js
import Kensho from '@yokotak0527/kensho'
// or if you are using CommonJS
const Kensho = require('@yokotak0527/kensho')
```

# Usage

```js
Kensho.rule.add('isNumber', value => typeof value === 'number')
Kensho.validate('isNumber', 10) // true

// with to use a converter
Kensho.converter.add('stringToNumber', value => {
  if (typeof value !=== 'string') throw new Error('value is not a string.')
  return Number(value)
})
Kensho.validate('isNumber', Kensho.convert('stringToNumber', "10")) // true

// with to use multiple converters
Kensho.converter.add('numberToString', value => {
  if (typeof value !=== 'number') throw new Error('value is not a number.')
  return value.toString()
})
Kensho.validate('isNumber', Kensho.convert(['numberToString', 'stringToNumber'], 2)) // true

// if you add an alias to `Kensho.convert`, it will be easier to read.
const to = Kensho.convert
Kensho.validate('isNumber', to(['numberToString', 'stringToNumber'], 2)) // true
```

The above example shows the sequential addition of rules and converters, but in actual use, you will probably have to import them from external sources.

# Rule

The rule is the logic used to validate a value.

Kensho provide general rules as external rules [kensho-rulebook-default](https://www.npmjs.com/package/@yokotak0527/kensho-rulebook-default),
but also you can add your original rules.

## Add your original rules

```js
import Kensho from '@yokotak0527/kensho'

// The rule function takes the value to be verified as the first argument, the
// function option as the second argument as an object, and returns a boolean
// value. The options are not required. If there are options, please set the
// default values for all properties.
Kensho.rule.add('isBoolean', val => typeof val === 'boolean')

Kensho.validate('isBoolean', false) // -> true
```

### With TypeScript

You can extend RuleBook(rule list kvs) with your `*.d.ts` file.

```typescript
// your *.d.ts file
declare namespace Kensho {
  interface RuleBook {
    'isBoolean' : (val:any)=>boolean
  }
}
```

```typescript
import Kensho from '@yokotak0527/kensho'

Kensho.rule.add('isBoolean', val => typeof val === 'boolean')
```

If you create a declaration file, the arguments will be inferred when you run `Kensho.validate()`.

# RuleBook

The ruleBook is a key-value store for rules. It is used for distributing rules or for bulk registration.

## create / use the RuleBook

```js
const ruleBook = {
  'isBoolean': value => typeof value === 'boolean',
  'isString': value => typeof value === 'string',
  'isNaturalNumber': (value, { zero = true }) => zero ? value >= 0 : value > 0
}

Kensho.rule.import(ruleBook)
```

# Converter

The converter is a logic that converts a passed value into another value or types.

Kensho provide general converters as external convertes [kensho-convbox-default](https://www.npmjs.com/package/@yokotak0527/kensho-convbox-default),
but also you can add your original converters.

## Add your original converters

```js
import Kensho from '@yokotak0527/kensho'

// The converter function takes the value to be converted and returns the converted value.
Kensho.converter.add('stringToNumber', value => {
  if (typeof value !== 'string') throw new Error('value is not a string.')
  return Number(value)
})

Kensho.convert('stringToNumber', "2") // -> 2
```

### with TypeScript

You can extend ConverterBox(converter list kvs) with your `*.d.ts` file.

```typescript
// your *.d.ts file
declare namespace Kensho {
  interface ConverterBox {
    'stringToNumber' : (val:string)=>number
  }
}
```

```typescript
import Kensho from '@yokotak0527/kensho'

Kensho.converter.add('stringToNumber', value => {
  if (typeof value !== 'string') throw new Error('value is not a string.')
  return Number(value)
})
```


## `Kensho.convert(converter, value)`

The argument `converter` can be of type `string` or `Array<string>`.

### with TypeScript

When using TypeScript, generics can be used to specify the types of input and output values.

```typescript
Kensho.convert<string, number>('stringToNumber', '2') // -> 2
```

However, if the declaration file extends ConverterBox, it will be inferred.

```typescript
Kensho.convert('stringToNumber', 2) // tsc catched a error
```

If an array of strings is passed as the first argument, no inference will be performed, but passing the array `as const` will enable the inference.

```typescript
Kensho.convert(['stringToNumber', 'numberToString'] as const, 2) //  // tsc catched a error
```

# ConverterBox

The converterBox is a key-value store for converter. It is used for distributing converter or for bulk registration.

## create / use the ConverterBox

```js
const converterBox = {
}

Kensho.converter.import(converterBox)
```

# `Kensho.validate()`

The arguments of this function is.

1. `ruleName:string` - to be use.
2. `value:any` - to be validated.
3. `ruleOption?:Object`- is `ruleName` option.
4. `validateOption?:Object` - is validating options.

## validateOption

| props                | default | desc. |
|----------------------|---------|-------|
| `throughEmptyString` | `false` | Returns `true` if the value is empty string before validating it. |
| `throughNull`        | `false` | Returns `true` if the value is null before validating it. |
| `throughUndefined`   | `false` | Returns `true` if the value is undefined before validating it. |
| `throughNaN`         | `false` | Returns `true` if the value is undefined before validating it. |

These values can be set in the global configuration and do not need to be specified each time.

# Global config.

```js
Kensho.config = {
  validate : {
    throughEmptyString : false,
    throughNull        : false,
    throughUndefined   : false,
    throughNaN         : false
  }
}
```
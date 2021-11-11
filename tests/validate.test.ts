import Kensho from '../src/Kensho'
const to = Kensho.convert

describe('Kensho.validate()', ()=>{

  // sampmle rules
  const isBoolean = (value: any) => typeof value === 'boolean'
  const isNumber = (value: any) => typeof value === 'number'
  const isNaturalNumber = (value: number, { zero = false } = {}) => {
    if (typeof value !== 'number') return false
    if (value % 1 !== 0) return false
    return zero ? value >= 0 : value > 0
  }
  const isNotEmpty = (value: any) => {
    if (typeof value === 'string') return !!value
    if (value === null) return false
    if (value === undefined) return false
    if (Number.isNaN(value)) return false
    return true
  }

  // sample converters
  const stringToNumber = (value: string):number => {
    if (typeof value !== 'string') throw new Error('value is not a string.')
    return Number(value)
  }
  const numberToString = (value: number):string => {
    if (typeof value !== 'number') throw new Error('value is not a string.')
    return value.toString()
  }

  test('OK : no converters, no options.', ()=>{
    Kensho.rule.add('isBoolean', isBoolean)
    expect(Kensho.validate('isBoolean', true)).toBeTruthy()
    expect(Kensho.validate('isBoolean', 'hoge')).toBeFalsy()
    Kensho.rule.remove('isBoolean')
  })

  test('OK : with convertesr', ()=>{
    Kensho.rule.add('isNumber', isNumber)
    Kensho.converter.add('stringToNumber', stringToNumber)
    Kensho.converter.add('numberToString', numberToString)

    expect(Kensho.validate('isNumber', to('stringToNumber', '2'))).toBeTruthy()
    expect(Kensho.validate('isNumber', to('numberToString', 2))).toBeFalsy()
    expect(Kensho.validate('isNumber', to(['numberToString', 'stringToNumber'], 2))).toBeTruthy()

    Kensho.converter.remove('stringToNumber')
    Kensho.converter.remove('numberToString')
    Kensho.rule.remove('isNumber')
  })

  test('OK : with ruleOption', ()=>{
    Kensho.rule.add('isNaturalNumber', isNaturalNumber)
    expect(Kensho.validate('isNaturalNumber', 0, { zero : true })).toBeTruthy()
    expect(Kensho.validate('isNaturalNumber', 0, { zero : false })).toBeFalsy()
    expect(Kensho.validate('isNaturalNumber', 0)).toBeFalsy()
    Kensho.rule.remove('isNaturalNumber')
  })

  test(`OK : with validateOption`, ()=>{
    Kensho.rule.add('isNotEmpty', isNotEmpty)
    expect(Kensho.validate('isNotEmpty', '')).toBeFalsy()
    expect(Kensho.validate('isNotEmpty', '', undefined, { throughEmptyString : true })).toBeTruthy()
    expect(Kensho.validate('isNotEmpty', null)).toBeFalsy()
    expect(Kensho.validate('isNotEmpty', null, undefined, { throughNull : true })).toBeTruthy()
    expect(Kensho.validate('isNotEmpty', undefined)).toBeFalsy()
    expect(Kensho.validate('isNotEmpty', undefined, undefined, { throughUndefined : true })).toBeTruthy()
    expect(Kensho.validate('isNotEmpty', NaN)).toBeFalsy()
    expect(Kensho.validate('isNotEmpty', NaN, undefined, { throughNaN : true })).toBeTruthy()
    Kensho.rule.remove('isNotEmpty')
  })
})
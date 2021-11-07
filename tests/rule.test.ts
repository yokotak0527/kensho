import Kensho from '../src/Kensho'

describe(`Add the rule`, ()=>{
  const dummyRule = (value:boolean)=> value

  test(`OK : Success`, ()=>{
    expect(Kensho.rule.add('myRule', dummyRule)).toBeUndefined()
    Kensho.rule.remove('myRule')
  })
  test(`OK : Add external ruleBook`, ()=>{
    const ruleBook:Kensho.RuleBook = {
      'isTrue'  : (value:boolean)=> value === true,
      'isFalse' : (value:boolean)=> value === false
    }
    expect(Kensho.rule.book(ruleBook)).toBeUndefined()
    Kensho.rule.remove('isTrue')
    Kensho.rule.remove('isFalse')
  })
  test(`NG : The rule already exist`, ()=>{
    Kensho.rule.add('myRule', dummyRule)
    expect(()=> Kensho.rule.add('myRule', dummyRule) ).toThrow()
    Kensho.rule.remove('myRule')
  })
  test(`NG : Pass empty string to the 1st argument`, ()=>{
    expect(()=> Kensho.rule.add('', dummyRule) ).toThrow()
  })
  test(`NG : Pass other than string to the 1st argument`, ()=>{
    expect(()=> Kensho.rule.add(1 as unknown as string, dummyRule) ).toThrow()
  })
  test(`NG : Pass other than function to the 2nd argument`, ()=>{
    expect(()=> Kensho.rule.add('rule3', 'function' as unknown as Kensho.DefaultRuleFunction) ).toThrow()
  })
})

describe(`Remove the rule`, ()=>{
  const dummyRule = (value:boolean)=> value

  test(`OK : Success`, ()=>{
    Kensho.rule.add('myRule', dummyRule)
    expect(Kensho.rule.remove('myRule')).toBeUndefined()
  })
  test(`NG : The rule don't existed`, ()=>{
    expect(()=> Kensho.rule.remove('myRule') ).toThrow()
  })
  test(`NG : Pass empty string to the argument`, ()=>{
    expect(()=> Kensho.rule.remove('') ).toThrow()
  })
  test(`NG : Pass other than string to the argument`, ()=>{
    expect(()=> Kensho.rule.remove(1 as unknown as string) ).toThrow()
  })
})

describe('Get the rule', ()=>{
  const dummyRule = (value:boolean)=> value

  test(`OK : Success`, ()=>{
    Kensho.rule.add('myRule', dummyRule)
    expect(Kensho.rule.get('myRule')).toBe(dummyRule)
    Kensho.rule.remove('myRule')
  })
  test(`NG : The rule don't existed`, ()=>{
    expect(()=> Kensho.rule.get('myRule') ).toThrow()
  })
  test(`NG : Pass empty string to the argument`, ()=>{
    expect(()=> Kensho.rule.get('') ).toThrow()
  })
  test(`NG : Pass other than string to the argument`, ()=>{
    expect(()=> Kensho.rule.get(1 as unknown as string) ).toThrow()
  })
})

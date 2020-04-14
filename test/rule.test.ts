import { Kensho } from '@src/Kensho'
import { RuleStore, RuleType, GetRuleType, ruleBook } from '@src/rule'
type KenshoType = typeof Kensho

describe('rule control', () => {
  interface MyRuleStore extends RuleStore {
    'sampleRule' : RuleType<string, {}>
  }

  test('Kensho.rule.add()', () => {
    const sampleFunc: MyRuleStore['sampleRule'] = (value, option) => {
      return true
    }
    Kensho.rule.add('sampleRule', sampleFunc)

    const callback = ruleBook.get('sampleRule')
    expect(typeof callback).toBe('function')
  })

  test('Kensho.rule.get()', () => {
    const callback = Kensho.rule.get<'sampleRule', MyRuleStore>('sampleRule')

    type T = RuleStore['regexp']
    // type T = GetRuleType<'sampleRule', MyRuleStore>
    // const c =
    // callback('hoge', {})
    expect(typeof callback).toBe('function')
  })

  test('Kensho.rule.delete()', () => {
    Kensho.rule.delete('sampleRule')

    expect(() => {
      Kensho.rule.get('sampleRule')
    }).toThrow()

    const callback = ruleBook.get('sampleRule')
    expect(callback).toBe(undefined)
  })
})

// describe('core rules', () => {
//   test('regexp', () => {
//     expect(Kensho.validate('regexp', 'hoge', { regexp : /^hoge$/ })).toBeTruthy()
//     expect(Kensho.validate('regexp', 'hoge', { regexp : /fuga/ })).toBeFalsy()
//   })

//   test('email', () => {
//     expect(Kensho.validate('email', 'a@a.com')).toBeTruthy()
//     expect(Kensho.validate('email', 'a@')).toBeFalsy()
//     expect(Kensho.validate('email', 'a.com')).toBeFalsy()
//     expect(Kensho.validate('email', 'a@a@a.com')).toBeFalsy()
//   })

//   test('list', () => {
//     const list = [
//       'hoge',
//       'fuga'
//     ]
//     expect(Kensho.validate('list', 'fuga', { list })).toBeTruthy()
//     expect(Kensho.validate('list', 'piyo', { list })).toBeFalsy()
//     expect(Kensho.validate('list', /^ho/, { list })).toBeTruthy()
//     expect(Kensho.validate('list', /yo$/, { list })).toBeFalsy()
//   })
// })

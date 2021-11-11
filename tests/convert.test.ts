import Kensho from '../src/Kensho'

describe('Kensho.convert()', ()=>{
  Kensho.converter.add('numberToString', (value:number)=>value.toString())
  Kensho.converter.add('stringToNumber', (value:string)=>Number(value))

  test('OK : Use single converter', ()=>{
    expect(Kensho.convert('numberToString', 2)).toBe('2')
  })

  test('OK : use multiple converter', ()=>{
    expect(Kensho.convert(['numberToString', 'stringToNumber'], 2)).toBe(2)
  })
})
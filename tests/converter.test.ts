import Kensho from '../src/Kensho'

describe(`Add the converter`, ()=>{
  const dummyConverter = (value:number)=> value.toString()

  test(`OK : Success`, ()=>{
    expect(Kensho.converter.add('myConverter', dummyConverter)).toBeUndefined()
    Kensho.converter.remove('myConverter')
  })

  test(`NG : The converter already exist`, ()=>{
    Kensho.converter.add('myConverter', dummyConverter)
    expect(()=> Kensho.converter.add('myConverter', dummyConverter) ).toThrow()
    Kensho.converter.remove('myConverter')
  })

  test(`NG : Pass empty string to the 1st argument`, ()=>{
    expect(()=> Kensho.converter.add('', dummyConverter) ).toThrow()
  })

  test(`NG : Pass other than string to the 1st argument`, ()=>{
    expect(()=> Kensho.converter.add(1 as unknown as string, dummyConverter) ).toThrow()
  })

  test(`NG : Pass other than function to the 2nd argument`, ()=>{
    expect(()=> Kensho.converter.add('myConverter', 'function' as unknown as Kensho.DefaultConverterFunction) ).toThrow()
  })
})

describe(`Remove the converter`, ()=>{
  const dummyConverter = (value:number)=> value.toString()
  
  test(`OK : Success`, ()=>{
    Kensho.converter.add('myConverter', dummyConverter)
    expect(Kensho.converter.remove('myConverter')).toBeUndefined()
  })

  test(`NG : the Converter don't existed`, ()=>{
    expect(()=> Kensho.converter.remove('myConverter') ).toThrow()
  })

  test(`NG : Pass empty string to the argument`, ()=>{
    expect(()=> Kensho.converter.remove('') ).toThrow()
  })

  test(`NG : Pass other than string to the argument`, ()=>{
    expect(()=> Kensho.converter.remove(1 as unknown as string) ).toThrow()
  })
})

describe('Get the converter', ()=>{
  const dummyConverter = (value:number)=> value.toString()

  test(`OK : Success`, ()=>{
    Kensho.converter.add('myConverter', dummyConverter)
    expect(Kensho.converter.get('myConverter')).toBe(dummyConverter)
    Kensho.converter.remove('myConverter')
  })
  test(`NG : The converter don't existed`, ()=>{
    expect(()=> Kensho.converter.get('myConverter') ).toThrow()
  })
  test(`NG : Pass empty string to the argument`, ()=>{
    expect(()=> Kensho.converter.get('') ).toThrow()
  })
  test(`NG : Pass other than string to the argument`, ()=>{
    expect(()=> Kensho.converter.get(1 as unknown as string) ).toThrow()
  })
})

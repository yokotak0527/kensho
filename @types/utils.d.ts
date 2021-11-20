declare namespace Kensho.utils {
  type getArrayIndex<T extends any[]> = T extends [any, ...infer L] ? L['length'] : never
  type getTupleLastItem<T extends any[]> = T[(T extends [any, ...infer L] ? L : never)['length']]
}
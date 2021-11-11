declare namespace Kensho.utils {
  type getTupleLastItem<T extends any[]> = T[(T extends [any, ...infer L] ? L : never)['length']]
}
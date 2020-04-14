import { RuleStore } from '@src/rule'
// import { Kensho } from '@src/Kensho'

/**
 *
 */
export const required: RuleStore['required'] = value => {
  if (typeof value === 'string') return value.trim() !== ''
  if (typeof value === 'number') return true
  if (Array.isArray(value)) return value.length !== 0
  if (typeof value === 'object' && value !== null) return Object.keys(value).length !== 0
  if (value === undefined) return false
  if (value === null) return false
  return true
}

/**
 *
 */
export const empty:RuleStore['empty'] = (value) => {
  if (typeof value === 'string') return value === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object' && value !== null) return Object.keys(value).length === 0
  if (value === undefined) return true
  return false
}

/**
 *
 */
export const regexp: RuleStore['regexp'] = (value, { regexp }) => {
  return regexp.test(value)
}

/**
 *
 */
export const email: RuleStore['email'] = (value, option, Kensho) => {
  /** @see https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript */
  return Kensho.validate('regexp', value, { regexp : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })
}

/**
 *
*/
export const list: RuleStore['list'] = (value, { list }, Kensho) => {
  let hit = false
  for (let i = 0, l = list.length; i < l; i++) {
    if (value instanceof RegExp) {
      hit = Kensho.validate('regexp', list[i], { regexp : value })
      if (hit) break
    } else if (value === list[i]) {
      hit = true
      break
    }
  }
  return hit
}

/**
 *
 */
export const number: RuleStore['number'] = value => {
  if (typeof value === 'number') return true
  return Number.isNaN(value as any * 1)
}

/**
 *
 */
export const integer: RuleStore['integer'] = (value, option, Kensho) => {
  if (!Kensho.validate('number', value)) return false

  if (typeof value === 'string') {
    value = parseInt(value, 10)
  }
  return value % 1 === 0
}
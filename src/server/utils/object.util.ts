/**
 * Utility & Helper Functions for Object-related
 */

export function isNullOrUndefined(item: any): boolean {
  if (typeof item === 'undefined' || item === null) {
    return true
  }

  return false
}

export function isNumber(item: any): boolean {
  return typeof item === 'number'
}

export function isBoolean(item: any): boolean {
  return typeof item === 'boolean'
}

export function isString(item: any): boolean {
  return typeof item === 'string'
}

export function isArray(item: any): boolean {
  return Array.isArray(item)
}

export function isObject(item: any): boolean {
  return typeof item === 'object'
}

export function isFunction(item: any): boolean {
  return typeof item === 'function'
}

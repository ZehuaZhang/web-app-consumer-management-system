import { isString } from 'client/utils/object.util'

export module ActionName {
  export const ChangeSearchTerm = 'Change Search Term'
}

namespace Constants {
}

export interface IAction {
  type: string
  [actionItemName: string]: any
}

export function changeSearchTerm(term: string) {
  if (!isString(term) || !term.trim()) {
    return
  }
  return {
    type: ActionName.ChangeSearchTerm,
    term
  }
}
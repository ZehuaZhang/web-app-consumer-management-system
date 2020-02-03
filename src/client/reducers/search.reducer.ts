import { ActionName, IAction } from '../actions/search.action'

export interface ISearchState {
  term: string
}

const initialState: ISearchState = {
  term: ''
}

const search = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionName.ChangeSearchTerm:
      return {
        ...state,
        term: action.term
      }
    default:
      return state
  }
}

export default search

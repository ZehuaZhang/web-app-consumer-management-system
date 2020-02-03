import { combineReducers } from 'redux'
import users, { IUserState } from './users.reducer'
import search, { ISearchState } from './search.reducer'

export interface State {
  users: IUserState,
  search: ISearchState
}

export const reducer = combineReducers<State>({
  users,
  search
})



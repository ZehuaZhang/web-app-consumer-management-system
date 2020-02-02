import { combineReducers } from 'redux'
import users, { IUserState } from './users.reducer'

export interface State {
  users: IUserState
}

export const reducer = combineReducers<State>({
  users,
})


